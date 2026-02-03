'use client';

import React, { useState, useEffect } from 'react';
import { 
  Folder, Image as ImageIcon, Video, Upload, ChevronRight, 
  Facebook, Instagram, Twitter, ChevronDown, ChevronUp, 
  Zap, Monitor, Smartphone, Globe, Search, Bell, Menu, LayoutGrid, X,
  Plus, Trash2, Edit3, Settings, UserPlus, ExternalLink, Youtube,
  Download, Upload as UploadIcon, FileJson, FilePlus, Users, Music2, PlusCircle, RefreshCcw, Link2
} from 'lucide-react';

// --- COMPONENTE INTERNO PARA LAS SECCIONES PLEGABLES ---
const CollapsibleSection = ({ title, icon: Icon, isOpen, onToggle, children }: { title: string, icon: any, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
  <div className="border border-white/5 bg-white/5 rounded-xl overflow-hidden mb-4 transition-all duration-300">
    {/* Barra de Título del Acordeón */}
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-black/20 hover:bg-white/5 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
          <Icon size={18} />
        </div>
        <span className={`text-sm font-bold tracking-wide transition-colors ${isOpen ? 'text-white' : 'text-gray-400'}`}>
          {title}
        </span>
      </div>
      {isOpen ? <ChevronDown size={18} className="text-cyan-400"/> : <ChevronRight size={18} className="text-gray-600"/>}
    </button>

    {/* Contenido Oculto/Visible */}
    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-4 border-t border-white/5 bg-[#09090b]/30">
        {children}
      </div>
    </div>
  </div>
);

// --- TYPES ---
interface SocialAccount {
    id: string | number;
    name: string;
    handle: string;
    icon: any; // Changed to any to store component reference if needed, or keeping ReactNode is fine but user snippet stores ref.
    color: string;
    bgHover: string;
    border: string;
    isActive?: boolean;
    defaultHandle?: string;
}

interface DashboardRowData {
    id: number;
    title: string;
    accounts: SocialAccount[];
}

// --- CONSTANTS ---
// --- CONSTANTS ---
// --- ICONS ---
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const PLATFORM_DEFAULTS: Record<string, any> = {
  fb: { name: 'Facebook', defaultHandle: 'Sin vincular', icon: Facebook, color: 'text-blue-500', bgHover: 'hover:bg-blue-500/20', border: 'border-blue-500/50' },
  ig: { name: 'Instagram', defaultHandle: 'Sin vincular', icon: Instagram, color: 'text-pink-500', bgHover: 'hover:bg-pink-500/20', border: 'border-pink-500/50' },
  tw: { name: 'Twitter/X', defaultHandle: 'Sin vincular', icon: XIcon, color: 'text-white', bgHover: 'hover:bg-gray-500/20', border: 'border-gray-500/50' },
  tk: { name: 'TikTok', defaultHandle: 'Sin vincular', icon: Music2, color: 'text-cyan-400', bgHover: 'hover:bg-cyan-500/20', border: 'border-cyan-500/50' },
  yt: { name: 'YouTube', defaultHandle: 'Sin vincular', icon: Youtube, color: 'text-red-500', bgHover: 'hover:bg-red-500/20', border: 'border-red-500/50' },
};

const DEFAULT_ACCOUNTS: SocialAccount[] = [
    { id: 'fb', ...PLATFORM_DEFAULTS.fb, handle: '@MiMarcaOficial', isActive: true, icon: <Facebook className="w-5 h-5" /> },
    { id: 'ig', ...PLATFORM_DEFAULTS.ig, handle: '@estilo_futuro', isActive: true, icon: <Instagram className="w-5 h-5" /> },
    { id: 'tw', ...PLATFORM_DEFAULTS.tw, handle: 'Sin vincular', isActive: true, icon: <XIcon className="w-5 h-5" /> },
    { id: 'tk', ...PLATFORM_DEFAULTS.tk, handle: 'Sin vincular', isActive: true, icon: <Music2 className="w-5 h-5" /> },
    { id: 'yt', ...PLATFORM_DEFAULTS.yt, handle: 'Sin vincular', isActive: true, icon: <Youtube className="w-5 h-5" /> },
];

// --- SUB-COMPONENT: SETTINGS MODAL ---
interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: SocialAccount[];
    onSave: (updatedAccounts: SocialAccount[]) => void;
}

const SettingsModal = ({ isOpen, onClose, accounts, onSave }: SettingsModalProps) => {
    const [localAccounts, setLocalAccounts] = useState<SocialAccount[]>(accounts);
    const [accountToDelete, setAccountToDelete] = useState<string | number | null>(null);

    // Sync state when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalAccounts(accounts);
        }
    }, [isOpen, accounts]);

    const handleChange = (id: string | number, field: 'name' | 'handle', value: string) => {
        setLocalAccounts(prev => prev.map(acc => 
            acc.id === id ? { ...acc, [field]: value } : acc
        ));
    };

    const confirmDelete = (id: string | number) => {
        setAccountToDelete(id);
    };

    const executeDelete = () => {
        if (accountToDelete !== null) {
            setLocalAccounts(prev => prev.filter(acc => acc.id !== accountToDelete));
            setAccountToDelete(null);
        }
    };

    const handleAddWeb = () => {
        const newId = Date.now();
        const newAccount: SocialAccount = {
            id: newId,
            name: 'Mi Sitio Web',
            handle: 'www.miweb.com',
            icon: <Globe className="w-5 h-5" />,
            color: 'text-white',
            bgHover: 'hover:bg-white/10',
            border: 'border-white/20',
            isActive: true
        };
        setLocalAccounts([...localAccounts, newAccount]);
    };

    const handleSave = () => {
        onSave(localAccounts);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <ConfirmModal 
                isOpen={accountToDelete !== null}
                onClose={() => setAccountToDelete(null)}
                onConfirm={executeDelete}
                title="¿Eliminar Cuenta?"
                message="Esta acción eliminará la cuenta de tu lista de configuración. Tendrás que volver a añadirla si la necesitas."
            />

            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
                
                <div className="relative bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col transform transition-all scale-100 ring-1 ring-white/5 max-h-[80vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 p-6 bg-[#09090b]">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Settings size={20} className="text-cyan-400" />
                            Configurar Redes
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        {/* Redes Activas / Configuradas */}
                        <div className="space-y-4">
                            {localAccounts.map((acc) => (
                                <div key={acc.id} className="flex flex-col gap-1 p-3 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            <div className={`p-1 rounded bg-black/50 ${acc.color} opacity-80`}>
                                                {acc.icon}
                                            </div>
                                            <input 
                                                type="text"
                                                value={acc.name}
                                                onChange={(e) => handleChange(acc.id, 'name', e.target.value)}
                                                className="bg-transparent border-none outline-none text-gray-400 font-bold uppercase w-full focus:text-cyan-400 focus:bg-white/5 rounded px-1 transition-colors"
                                            />
                                        </span>
                                        <button 
                                            onClick={() => confirmDelete(acc.id)}
                                            className="text-gray-600 hover:text-red-400 transition-colors p-1"
                                            title="Eliminar esta red"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg p-2 focus-within:border-cyan-500/50 transition-all">
                                        <span className="text-gray-500 text-xs font-mono">URL/User:</span>
                                        <input
                                            type="text"
                                            value={acc.handle}
                                            onChange={(e) => handleChange(acc.id, 'handle', e.target.value)}
                                            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-600 font-mono"
                                            placeholder={`Usuario o URL...`}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Botón Nueva Web Personalizada */}
                            <button 
                                onClick={handleAddWeb}
                                className="w-full py-3 border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-sm font-medium"
                            >
                                <Globe size={16} />
                                Agregar Nueva Web
                            </button>
                        </div>

                        {/* Redes Disponibles (Presets Eliminados) */}
                        {Object.keys(PLATFORM_DEFAULTS).filter(pid => !localAccounts.some(a => a.id === pid)).length > 0 && (
                            <div className="pt-4 border-t border-white/10">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Redes Disponibles</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.keys(PLATFORM_DEFAULTS)
                                        .filter(pid => !localAccounts.some(a => a.id === pid))
                                        .map(pid => {
                                            const preset = PLATFORM_DEFAULTS[pid];
                                            return (
                                                <button
                                                    key={pid}
                                                    onClick={() => {
                                                        const newAcc = { id: pid, ...preset, handle: '', isActive: true };
                                                        // Ensure icon is rendered correctly as ReactNode
                                                        newAcc.icon = <preset.icon className="w-5 h-5" />;
                                                        setLocalAccounts([...localAccounts, newAcc]);
                                                    }}
                                                    className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-left"
                                                >
                                                    <div className={`p-1 rounded bg-black/50 text-gray-400`}>
                                                        <preset.icon size={14} />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-300">{preset.name}</span>
                                                    <PlusCircle size={12} className="ml-auto text-cyan-500 opacity-60" />
                                                </button>
                                            );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 justify-end border-t border-white/10 p-6 bg-[#09090b]">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 transition-all text-sm font-bold"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


// --- SUB-COMPONENT: SINGLE DASHBOARD ROW ---
interface DashboardRowProps {
    id: number;
    title: string;
    accounts: SocialAccount[];
    onTitleChange: (newTitle: string) => void;
    onAccountsChange: (newAccounts: SocialAccount[]) => void;
    onDelete: () => void;
    showDelete: boolean;
}

const DashboardRow = ({ id, title, accounts, onTitleChange, onAccountsChange, onDelete, showDelete }: DashboardRowProps) => {
  // --- ESTADOS PROPIOS DE LA UI (No persistentes o locales) ---
  
  // Estado Panel Central (Redes)
  const [isAccountsOpen, setAccountsOpen] = useState(false);
  const [isUploadOpen, setUploadOpen] = useState(true);
  const [activeNetwork, setActiveNetwork] = useState(accounts[0]?.id || 1); // Default to first account
  
  // Estado Configuración
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Estado Panel Derecho (Navegador)
  const [selectedBrowser, setSelectedBrowser] = useState('chrome'); // chrome, safari, firefox
  const [viewMode, setViewMode] = useState('desktop'); // desktop, mobile

  // Estado Edición Título
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showInactiveList, setShowInactiveList] = useState(false);

  const activeAccounts = accounts.filter(a => a.isActive);
  const inactiveAccounts = accounts.filter(a => !a.isActive);

  // LÓGICA CLAVE: ELIMINAR VS. REINICIAR
  const handleAccountAction = (id: string | number, action: 'delete' | 'restore') => {
    const updatedAccounts = accounts.map(acc => {
      if (acc.id !== id) return acc;

      if (action === 'delete') {
        // Al eliminar, solo la ocultamos (isActive = false)
        return { ...acc, isActive: false };
      } 

      if (action === 'restore') {
        // AL RESTAURAR: Volvemos a los datos DE MUESTRA (Reset)
        // Usamos PLATFORM_DEFAULTS para pisar cualquier dato viejo
        const defaultData = PLATFORM_DEFAULTS[String(id)];
        if (!defaultData) return acc; // Safety check for custom accounts or unmapped IDs

        return { 
          ...acc, 
          isActive: true, 
          name: defaultData.name,
          handle: defaultData.defaultHandle,
          // Re-instantiate icon if needed, or keep existing one if styling allows
        };
      }
      return acc;
    });
    onAccountsChange(updatedAccounts);
  };

  /* --- AÑADIR WEB PERSONALIZADA (Botón "Crear") --- */
  const handleAddCustomWeb = () => {
    const newId = `web-${Date.now()}`;
    const newAccount: SocialAccount = {
        id: newId,
        name: 'Nuevo Sitio Web',
        handle: '', // Empty initially
        icon: <Globe className="w-5 h-5" />,
        color: 'text-emerald-400',
        bgHover: 'hover:bg-emerald-500/10',
        border: 'border-emerald-500/20',
        isActive: true,
        defaultHandle: ''
    };
    
    // Add to state
    onAccountsChange([...accounts, newAccount]);
    setActiveNetwork(newId);
    setIsSettingsOpen(true); // Open Settings immediately to configure URL
  };

  const handleUpdateAccount = (id: string | number, field: 'name' | 'handle', value: string) => {
    const updated = accounts.map(acc => 
        acc.id === id ? { ...acc, [field]: value } : acc
    );
    onAccountsChange(updated);
  };

  // Mock Folders (Esto podría moverse al estado global también si se desea persistir)


  const activeAccount = accounts.find(a => a.id === activeNetwork) || accounts[0];

  return (
    <div className="flex flex-col gap-2 relative">
        
        {/* MODAL CONFIGURACIÓN (Local a la fila) */}
        <SettingsModal 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            accounts={accounts} // Pasamos data global
            onSave={onAccountsChange} // Actualizamos data global
        />

        {/* --- SECTION HEADER --- */}
        <div className="flex items-center justify-between px-1">
            {/* Left: Editable Title */}
            <div className="flex items-center gap-3 group/title cursor-text" onClick={() => setIsEditingTitle(true)}>
                {isEditingTitle ? (
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                        autoFocus
                        className="bg-transparent border-b border-cyan-500 text-2xl font-light text-white outline-none min-w-[300px]"
                        placeholder="Nombre de Sección..."
                    />
                ) : (
                    <>
                        <h2 className="text-2xl font-light text-white opacity-90">{title || `Panel Multimedia ${id}`}</h2>
                        <Edit3 size={14} className="text-gray-500 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                    </>
                )}
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium backdrop-blur-md"
                >
                    <Settings size={16} />
                    <span>Configuración</span>
                </button>
                
                {showDelete && (
                     <button 
                        onClick={onDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40 transition-all text-sm font-medium backdrop-blur-md"
                    >
                        <Trash2 size={16} />
                        <span>Eliminar Sección</span>
                    </button>
                )}
            </div>
        </div>


        {/* --- CONTENT BODY (Unified 3 Columns) --- */}
        <div className="w-full h-[700px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex overflow-hidden relative group hover:shadow-cyan-900/10 hover:border-white/20 transition-all duration-500">
        
        {/* =======================================================
            COLUMNA 1: GESTOR DE ACTIVOS (Izquierda)
            ======================================================= */}
        <div className="w-[280px] h-full border-r border-white/10 flex flex-col bg-black/10">
            <div className="p-6 flex flex-col h-full">
                {/* Título */}
                <div className="flex items-center gap-2 mb-6 text-cyan-400 tracking-wider font-bold text-sm uppercase">
                <Folder size={18} /> Explorador <span className="text-gray-600 text-xs ml-auto">#{id}</span>
                </div>

                {/* Drop Zone */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-cyan-500/50 hover:bg-white/5 transition-all cursor-pointer group mb-6">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <p className="text-xs text-gray-400 font-medium">Subir Contenido</p>
                </div>

                {/* Lista de Carpetas */}
                {/* Lista de Carpetas (Eliminada) */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                   {/* Espacio reservado para futuras carpetas o gestor de archivos */}
                   <div className="p-4 text-center text-gray-600 text-xs italic border border-dashed border-white/5 rounded-lg">
                       Sin carpetas activas
                   </div>
                </div>

                {/* Stats Footer */}
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500 flex justify-between">
                <span>Almacenamiento</span>
                <span className="text-cyan-400">45% Usado</span>
                </div>
            </div>
        </div>


        {/* =======================================================
            COLUMNA 2: SOCIAL HUB DINÁMICO (Centro)
            ======================================================= */}
        <div className="w-[380px] h-full border-r border-white/10 flex flex-col transition-all duration-500 bg-black/5">
            
            {/* HEADER / BARRA DE ACCESO RÁPIDO */}
            <div className="p-4 bg-black/20 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex gap-2">
                {accounts.map((acc) => (
                    <button
                    key={acc.id}
                    onClick={() => setActiveNetwork(acc.id)}
                    className={`relative p-2.5 rounded-xl transition-all duration-300 border ${
                        activeNetwork === acc.id 
                        ? `bg-white/10 ${acc.border} shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white` 
                        : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                    >
                    {acc.icon}
                    {/* Indicador Activo */}
                    {activeNetwork === acc.id && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></span>
                    )}
                    </button>
                ))}
                </div>
                
                {/* Botón de Configuración */}
                <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 bg-white/5 hover:bg-cyan-600/20 rounded-lg text-gray-400 hover:text-cyan-400 border border-white/5 transition-all"
                >
                <Settings size={18} />
                </button>
            </div>

            {/* CUERPO CON SCROLL (Plegables Apilados) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                
                {/* SECCIÓN A: LISTA DE CUENTAS (Plegable) */}
                <CollapsibleSection 
                title="Cuentas Conectadas" 
                icon={Users} 
                isOpen={isAccountsOpen} 
                onToggle={() => setAccountsOpen(!isAccountsOpen)}
                >
                <div className="space-y-2">
                    {/* LISTA DE ACTIVAS */}
                    {activeAccounts.length > 0 ? (
                    activeAccounts.map((acc) => (
                        <div key={acc.id} onClick={() => setActiveNetwork(acc.id)} className={`group flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer transition-all hover:bg-white/10 hover:border-white/10 ${activeNetwork === acc.id ? 'ring-1 ring-white/20 bg-white/10' : ''}`}>
                            
                            {/* Icono */}
                            <div className={`p-2 rounded-lg bg-black/40 ${String(acc.color).replace('text-', 'bg-').replace('-500', '-500/20').replace('-400', '-400/20')} border border-white/5`}>
                                <div className={acc.color}>{acc.icon}</div>
                            </div>

                            {/* Info (Nombre + URL) */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-200 leading-none mb-1">{acc.name}</h4>
                                <p className="text-[10px] text-gray-500 truncate font-mono">{acc.handle || 'Sin configurar'}</p>
                            </div>

                            {/* Icono Link Externo */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink size={14} className="text-gray-600 hover:text-white" />
                            </div>

                        </div>
                    ))
                    ) : (
                        <p className="text-xs text-gray-500 text-center py-4">No hay cuentas visibles.</p>
                    )}
                    
                    {/* Botón Añadir Página (Abre Configuración) */}
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full py-3 mt-2 border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                    >
                        <div className="p-1 rounded-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                            <Plus size={12} />
                        </div>
                        Añadir página
                    </button>
                    
                </div>
            </CollapsibleSection>


                {/* SECCIÓN B: FORMULARIO DE CARGA (Plegable) */}
                <CollapsibleSection 
                title="Nueva Publicación" 
                icon={FilePlus} 
                isOpen={isUploadOpen} 
                onToggle={() => setUploadOpen(!isUploadOpen)}
                >
                <div className="space-y-4">
                    {/* Input Título */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Título</label>
                        <input 
                        type="text" 
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" 
                        placeholder="Ej: Promo Verano..." 
                        />
                    </div>
                    
                    {/* Input Descripción */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Descripción</label>
                        <textarea 
                        rows={3} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors resize-none" 
                        placeholder="Escribe tu copy aquí..." 
                        />
                    </div>

                    {/* Zona de Drop (Upload) */}
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all cursor-pointer group">
                        <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="text-gray-400 group-hover:text-cyan-400" size={24} />
                        </div>
                        <p className="text-sm text-gray-300 font-medium">Arrastra tus archivos</p>
                        <p className="text-xs text-gray-600 mt-1">Soporta video e imágenes</p>
                    </div>

                    {/* Botón Publicar */}
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white text-sm font-bold shadow-lg shadow-cyan-900/20 mt-2 transition-all active:scale-[0.98]">
                    Publicar Ahora
                    </button>
                </div>
                </CollapsibleSection>
                
                {/* Espacio extra al final */}
                <div className="h-8"></div>
            </div>
        </div>


        {/* =======================================================
            COLUMNA 3: SIMULADOR DE NAVEGADOR (Derecha)
            ======================================================= */}
        <div className="flex-1 h-full flex flex-col bg-white">
            
            {/* Browser Controls */}
            <div className="bg-[#1e293b] border-b border-white/10 p-2 flex items-center gap-4 text-white shrink-0">
                {/* Semáforo Window */}
                <div className="flex gap-1.5 ml-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>

                {/* Selector de Navegador */}
                <div className="flex bg-black/30 rounded-lg p-1 ml-4 border border-white/5">
                {['chrome', 'safari', 'firefox'].map((browser) => (
                    <button
                    key={browser}
                    onClick={() => setSelectedBrowser(browser)}
                    className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                        selectedBrowser === browser 
                        ? 'bg-gray-700 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                    >
                    {browser}
                    </button>
                ))}
                </div>

                {/* Barra de Dirección Simulada */}
                <div className="flex-1 bg-black/40 rounded-md border border-white/5 px-3 py-1.5 flex items-center gap-2 text-xs text-gray-400 font-mono overflow-hidden">
                <LockIcon className="w-3 h-3 text-green-500" />
                <span>{activeAccount ? `https://${activeAccount.name.toLowerCase()}.com/${activeAccount.handle.replace('@','')}` : 'https://...'}</span>
                </div>

                {/* Device Toggle */}
                <div className="flex gap-2 text-gray-400 pr-2 mr-2">
                <Monitor 
                    size={16} 
                    className={`cursor-pointer hover:text-white transition-colors ${viewMode === 'desktop' ? 'text-cyan-400' : ''}`}
                    onClick={() => setViewMode('desktop')}
                />
                <Smartphone 
                    size={16} 
                    className={`cursor-pointer hover:text-white transition-colors ${viewMode === 'mobile' ? 'text-cyan-400' : ''}`}
                    onClick={() => setViewMode('mobile')}
                />
                </div>
            </div>

            {/* Viewport Area */}
            <div className="flex-1 relative overflow-hidden flex justify-center bg-gray-100">
                {/* Contenedor simulado del sitio web */}
                <div className={`bg-white shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border-x border-gray-200 ${viewMode === 'mobile' ? 'w-[375px] my-4 rounded-[30px] border-y border-gray-800 ring-8 ring-gray-900 h-[calc(100%-2rem)]' : 'w-full h-full'}`}>
                
                {/* Fake Website Header */}
                <div className="h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
                    <span className="font-bold text-xl tracking-tighter text-black">{activeAccount?.name || 'Web'}</span>
                    <div className="flex gap-3">
                        <Search className="w-5 h-5 text-gray-400"/>
                        <Menu className="w-5 h-5 text-black"/>
                    </div>
                </div>

                {/* Fake Website Content */}
                <div className="flex-1 overflow-y-auto p-0 scrollbar-hide bg-gray-50">
                    {/* Hero Section */}
                    <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center relative">
                        <ImageIcon className="text-gray-400 w-12 h-12 opacity-50" />
                        <div className="absolute bottom-[-24px] left-4 w-16 h-16 bg-white rounded-full border-4 border-white shadow-md"></div>
                    </div>
                    
                    {/* Info */}
                    <div className="pt-8 px-4 pb-4 bg-white mb-2">
                        <h1 className="font-bold text-lg text-black">{activeAccount?.handle || '...'}</h1>
                        <p className="text-gray-600 text-sm mt-1">Marca oficial. Futuro del diseño y la tecnología.</p>
                        <div className="flex gap-4 mt-3 text-sm">
                            <span className="font-bold text-black">125 <span className="font-normal text-gray-500">Posts</span></span>
                            <span className="font-bold text-black">12.5k <span className="font-normal text-gray-500">Followers</span></span>
                        </div>
                    </div>

                    {/* Grid de Fotos */}
                    <div className="grid grid-cols-3 gap-0.5">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                        <div key={n} className="aspect-square bg-gray-200 relative group cursor-pointer hover:opacity-90">
                            <img 
                                src={`https://picsum.photos/400?random=${n + String(activeNetwork).split('').reduce((a,b)=>a+b.charCodeAt(0),0) + id}`} 
                                alt="Post" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        ))}
                    </div>
                </div>

                </div>
            </div>
        </div>

        </div>
    </div>
  );
};

// --- REUSABLE COMPONENT: CONFIRMATION MODAL ---
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            {/* Modal Content */}
            <div className="relative bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col gap-4 transform transition-all scale-100 ring-1 ring-white/5">
                 {/* Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 blur-sm" />

                <div className="flex items-center gap-3 text-red-500 mb-2">
                    <div className="p-2 bg-red-500/10 rounded-full border border-red-500/20">
                        <Trash2 size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                    {message}
                </p>

                <div className="flex gap-3 mt-4 justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 transition-all text-sm font-bold"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const FullStackDashboard = () => {
    // Estado Global de Filas (contiene toda la data importante)
    const [rows, setRows] = useState<DashboardRowData[]>([
        { 
            id: 1, 
            title: 'Panel Multimedia', 
            accounts: DEFAULT_ACCOUNTS
        }
    ]);
    
    // Estado del Modal de Eliminación de Sección
    const [sectionToDelete, setSectionToDelete] = useState<number | null>(null);

    // Funciones de Gestión de Estado Global
    const addRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows([...rows, { 
            id: newId, 
            title: 'Nueva Sección',
            accounts: DEFAULT_ACCOUNTS 
        }]);
    };

    const confirmDeleteRow = (id: number) => {
        setSectionToDelete(id);
    };

    const executeDeleteRow = () => {
        if (sectionToDelete !== null) {
            setRows(rows.filter(row => row.id !== sectionToDelete));
            setSectionToDelete(null);
        }
    };

    const updateRowTitle = (id: number, newTitle: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, title: newTitle } : row));
    };

    const updateRowAccounts = (id: number, newAccounts: SocialAccount[]) => {
        setRows(rows.map(row => row.id === id ? { ...row, accounts: newAccounts } : row));
    };

    // --- FUNCIONALIDAD GUARDAR / CARGAR ---
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSaveConfig = async () => {
        // Crear versión serializable del estado (sin componentes React como 'icon')
        const serializableRows = rows.map(row => ({
            ...row,
            accounts: row.accounts.map(acc => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { icon, ...rest } = acc;
                return rest;
            })
        }));

        const dataStr = JSON.stringify(serializableRows, null, 2);

        try {
            // Intentar usar la API moderna de Acceso a Archivos para "Guardar Como"
            // @ts-ignore
            if (window.showSaveFilePicker) {
                // @ts-ignore
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'dashboard-config.json',
                    types: [{
                        description: 'JSON Configuration File',
                        accept: { 'application/json': ['.json'] },
                    }],
                });
                
                // @ts-ignore
                const writable = await handle.createWritable();
                await writable.write(dataStr);
                await writable.close();
                alert('Configuración guardada correctamente.');
                return; 
            }
        } catch (err) {
            // Si el usuario cancela, no hacemos nada. Si falla la API, pasamos al fallback.
            if ((err as Error).name === 'AbortError') {
                return;
            }
            console.warn('File System Access API fallback:', err);
        }

        // Fallback: Método clásico de descarga (si no se soporta la API o falla)
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'dashboard-config.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleLoadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsedData = JSON.parse(content);
                
                // Validación básica
                if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].accounts) {
                    // Reconstruir iconos porque React Nodes no se serializan
                    // Mapeamos los iconos basándonos en el nombre de la red o ID aproximado
                    // O simplemente reinicializamos iconos visuales si es necesario.
                    // Para simplificar, re-asignaremos iconos basados en el nombre o tipo.
                    
                    const restoredRows = parsedData.map((row: any) => ({
                        ...row,
                        accounts: row.accounts.map((acc: any) => ({
                            ...acc,
                            icon: getIconForAccount(acc.name) // Función helper para restaurar iconos
                        }))
                    }));

                    setRows(restoredRows);
                    alert('Configuración cargada correctamente.');
                } else {
                    alert('El archivo no tiene el formato correcto.');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error al leer el archivo de configuración.');
            }
        };
        reader.readAsText(file);
        // Reset input value to allow reloading same file
        event.target.value = '';
    };

    // Helper para recuperar iconos (ya que JSON no guarda componentes React)
    const getIconForAccount = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('facebook')) return <Facebook className="w-5 h-5" />;
        if (lowerName.includes('instagram')) return <Instagram className="w-5 h-5" />;
        if (lowerName.includes('twitter') || lowerName.includes('x')) return <Twitter className="w-5 h-5" />;
        if (lowerName.includes('tiktok')) return <span className="font-bold text-lg leading-none">♪</span>;
        if (lowerName.includes('youtube')) return <Youtube className="w-5 h-5" />;
        return <Globe className="w-5 h-5" />; // Default fallback
    };


    return (
        <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans overflow-y-auto overflow-x-hidden relative selection:bg-cyan-500/30">
        
        {/* Input Oculto para Cargar Archivo */}
        <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleLoadConfig}
            className="hidden"
            accept=".json"
        />

        {/* --- MODALES --- */}
        <ConfirmModal 
            isOpen={sectionToDelete !== null}
            onClose={() => setSectionToDelete(null)}
            onConfirm={executeDeleteRow}
            title="¿Eliminar Sección?"
            message="Esta acción no se puede deshacer. Se perderá toda la configuración de esta sección."
        />

        {/* --- FONDO AMBIENTAL (Glow Effects) --- */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-800/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-900/20 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] left-[30%] w-[20vw] h-[20vw] bg-purple-900/10 rounded-full blur-[80px]" />
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 flex flex-col p-8 gap-8 max-w-[1600px] mx-auto pb-32">
            
            <header className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Dashboard Multicuentas
                    </h1>
                    <p className="text-gray-400">Gestiona múltiples marcas en paneles unificados.</p>
                </div>

                {/* BOTONES GUARDAR / CARGAR (Top Right) */}
                <div className="flex gap-3">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all text-sm font-medium"
                    >
                        <UploadIcon size={16} />
                        Cargar
                    </button>
                    <button 
                        onClick={handleSaveConfig}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-900/20 transition-all text-sm font-bold"
                    >
                        <Download size={16} />
                        Guardar
                    </button>
                </div>
            </header>

            {/* Renderizar Filas */}
            <div className="flex flex-col gap-16">
                {rows.map((row) => (
                    <DashboardRow 
                        key={row.id} 
                        id={row.id} 
                        title={row.title}
                        accounts={row.accounts}
                        onTitleChange={(newTitle) => updateRowTitle(row.id, newTitle)}
                        onAccountsChange={(newAccounts) => updateRowAccounts(row.id, newAccounts)}
                        onDelete={() => confirmDeleteRow(row.id)}
                        showDelete={true}
                    />
                ))}
            </div>

            {/* Botón Agregar Fila (Footer) */}
            <button 
                onClick={addRow}
                className="group flex flex-col items-center justify-center w-full py-12 border-2 border-dashed border-white/10 rounded-3xl hover:border-cyan-500/50 hover:bg-white/5 transition-all cursor-pointer mt-4"
            >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors mb-2">
                    <Plus size={32} />
                </div>
                <span className="text-gray-400 font-medium group-hover:text-white transition-colors">Agregar Nueva Sección de Trabajo</span>
            </button>

        </div>
        </div>
    );
};

// Helper Icon Component
const LockIcon = ({className}: {className: string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default FullStackDashboard;
