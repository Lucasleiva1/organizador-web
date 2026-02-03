
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Folder, Image as ImageIcon, Video, Upload, ChevronRight, 
  Facebook, Instagram, Twitter, ChevronDown, ChevronUp, 
  Zap, Monitor, Smartphone, Globe, Search, Bell, Menu, LayoutGrid, X,
  Plus, Trash2, Edit3, Settings, UserPlus, ExternalLink
} from 'lucide-react';

// --- TYPES ---
interface SocialAccount {
    id: number;
    name: string;
    handle: string;
    icon: React.ReactNode;
    color: string;
    bgHover: string;
    border: string;
}

// --- SUB-COMPONENT: SETTINGS MODAL ---
interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: SocialAccount[];
    onSave: (updatedAccounts: SocialAccount[]) => void;
}

const SettingsModal = ({ isOpen, onClose, accounts, onSave }: SettingsModalProps) => {
    const [localAccounts, setLocalAccounts] = useState<SocialAccount[]>(accounts);
    const [accountToDelete, setAccountToDelete] = useState<number | null>(null);

    // Sync state when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalAccounts(accounts);
        }
    }, [isOpen, accounts]);

    const handleChange = (id: number, field: 'name' | 'handle', value: string) => {
        setLocalAccounts(prev => prev.map(acc => 
            acc.id === id ? { ...acc, [field]: value } : acc
        ));
    };

    const confirmDelete = (id: number) => {
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
            border: 'border-white/20'
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
                
                <div className="relative bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-6 max-w-lg w-full flex flex-col gap-6 transform transition-all scale-100 ring-1 ring-white/5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 sticky top-0 bg-[#09090b] z-10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Settings size={20} className="text-cyan-400" />
                            Configurar Redes
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
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

                        <button 
                            onClick={handleAddWeb}
                            className="w-full py-3 border border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-sm font-medium"
                        >
                            <Globe size={16} />
                            Agregar Nueva Web
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 justify-end border-t border-white/10 pt-4 sticky bottom-0 bg-[#09090b] z-10">
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
    onTitleChange: (newTitle: string) => void;
    onDelete: () => void;
    showDelete: boolean;
}

const DashboardRow = ({ id, title, onTitleChange, onDelete, showDelete }: DashboardRowProps) => {
  // --- ESTADOS PROPIOS DE ESTA FILA ---
  
  // Estado Panel Central (Redes)
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(1); // 1: FB, 2: IG, 3: TK, 4: X
  
  // Estado Configuración
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Datos Iniciales (State)
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { id: 1, name: 'Facebook', handle: '@MiMarcaOficial', icon: <Facebook className="w-5 h-5" />, color: 'text-blue-500', bgHover: 'hover:bg-blue-500/20', border: 'border-blue-500/50' },
    { id: 2, name: 'Instagram', handle: '@estilo_futuro', icon: <Instagram className="w-5 h-5" />, color: 'text-pink-500', bgHover: 'hover:bg-pink-500/20', border: 'border-pink-500/50' },
    { id: 3, name: 'TikTok', handle: '@viral_video', icon: <span className="font-bold text-lg leading-none">♪</span>, color: 'text-cyan-400', bgHover: 'hover:bg-cyan-500/20', border: 'border-cyan-500/50' },
    { id: 4, name: 'Twitter/X', handle: '@news_now', icon: <Twitter className="w-5 h-5" />, color: 'text-gray-300', bgHover: 'hover:bg-gray-500/20', border: 'border-gray-500/50' },
  ]);

  // Estado Panel Derecho (Navegador)
  const [selectedBrowser, setSelectedBrowser] = useState('chrome'); // chrome, safari, firefox
  const [viewMode, setViewMode] = useState('desktop'); // desktop, mobile

  // Estado Edición Título
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Mock Folders
  const folders = ['Campaña Verano 2026', 'Lanzamiento Producto', 'Reels Pendientes', 'Historias Destacadas', 'Memes Virales'];

  const activeAccount = socialAccounts.find(a => a.id === activeNetwork) || socialAccounts[0];

  return (
    <div className="flex flex-col gap-2 relative">
        
        {/* MODAL CONFIGURACIÓN (Local a la fila) */}
        <SettingsModal 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            accounts={socialAccounts}
            onSave={setSocialAccounts}
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
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {folders.map((folder, i) => (
                    <div key={i} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/5">
                    <div className={`p-2 rounded-md ${i % 2 === 0 ? 'bg-indigo-500/20 text-indigo-300' : 'bg-purple-500/20 text-purple-300'}`}>
                        {i % 2 === 0 ? <ImageIcon size={14} /> : <Video size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white truncate">{folder}</p>
                        <p className="text-[10px] text-gray-500">12 items</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-700 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                ))}
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
                {socialAccounts.map((acc) => (
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
                
                {/* Toggle Button */}
                <button 
                onClick={() => setIsSocialExpanded(!isSocialExpanded)}
                className="p-2 bg-white/5 hover:bg-cyan-600/20 rounded-lg text-gray-400 hover:text-cyan-400 border border-white/5 transition-all"
                >
                {isSocialExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* CONTENIDO DESPLEGABLE (Lista Detallada) */}
            <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden bg-black/20 ${isSocialExpanded ? 'max-h-[600px] opacity-100 border-b border-white/5' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Cuentas Conectadas</p>
                {socialAccounts.map((acc) => (
                    <div key={acc.id} onClick={() => setActiveNetwork(acc.id)} className={`flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer transition-all ${acc.bgHover}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-black/40 ${acc.color}`}>{acc.icon}</div>
                        <div>
                        <h4 className="text-sm font-semibold text-gray-200">{acc.name}</h4>
                        <p className="text-[10px] text-gray-500">{acc.handle}</p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            let url = acc.handle;
                            if (!url.startsWith('http')) {
                                url = `https://${url}`;
                            }
                            window.open(url, '_blank');
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                        title="Abrir en navegador"
                    >
                        <ExternalLink size={14} />
                    </button>
                    </div>
                ))}
                <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="w-full py-2 text-xs text-center border border-dashed border-white/20 text-gray-400 rounded-lg hover:text-white hover:border-cyan-500 transition-colors"
                >
                    + Conectar Nueva Marca
                </button>
                </div>
            </div>

            {/* ESTADO ACTIVO (Lo que se ve cuando está colapsado o expandido) */}
            <div className="flex-1 p-6 flex flex-col relative overflow-hidden">
                {/* Fondo sutil del color de la red */}
                <div className={`absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-${activeAccount.color.split('-')[1]}-500/10 to-transparent rounded-full blur-3xl pointer-events-none`} />
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-light">Panel <strong className={activeAccount.color}>{activeAccount.name}</strong></h2>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase border border-green-500/20">En Línea</span>
                    </div>

                    {/* Feed de Actividad / Cola de Publicación */}
                    <div className="flex-1 space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Próxima Publicación</span>
                        <span className="text-xs text-cyan-400">Hoy, 18:00</span>
                        </div>
                        <div className="h-24 bg-black/30 rounded-lg border border-white/5 flex items-center justify-center text-gray-600 text-xs italic">
                        Arrastra un archivo aquí para programar
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                            <div className="text-xl font-bold text-white">12.5K</div>
                            <div className="text-[10px] text-gray-500 uppercase">Seguidores</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                            <div className="text-xl font-bold text-white">+5.2%</div>
                            <div className="text-[10px] text-gray-500 uppercase">Engagement</div>
                        </div>
                    </div>
                    </div>
                    
                    <button className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-900/20 transition-all active:scale-95">
                    Crear Publicación
                    </button>
                </div>
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
                <span>https://{activeAccount.name.toLowerCase()}.com/{activeAccount.handle.replace('@','')}</span>
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
                    <span className="font-bold text-xl tracking-tighter text-black">{activeAccount.name}</span>
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
                        <h1 className="font-bold text-lg text-black">{activeAccount.handle}</h1>
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
                                src={`https://picsum.photos/400?random=${n + activeNetwork * 10 + id}`} 
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
    // Estado de las filas: Arreglo de objetos { id, title }
    const [rows, setRows] = useState([{ id: 1, title: 'Panel Multimedia' }]);
    
    // Estado del Modal de Eliminación
    const [sectionToDelete, setSectionToDelete] = useState<number | null>(null);

    const addRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows([...rows, { id: newId, title: 'Nueva Sección' }]);
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

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans overflow-y-auto overflow-x-hidden relative selection:bg-cyan-500/30">
        
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
            
            <header className="mb-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Dashboard Multicuentas
                </h1>
                <p className="text-gray-400">Gestiona múltiples marcas en paneles unificados.</p>
            </header>

            {/* Renderizar Filas */}
            <div className="flex flex-col gap-16">
                {rows.map((row) => (
                    <DashboardRow 
                        key={row.id} 
                        id={row.id} 
                        title={row.title}
                        onTitleChange={(newTitle) => updateRowTitle(row.id, newTitle)}
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
