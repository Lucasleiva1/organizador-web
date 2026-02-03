const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

try {
  // Al estar contextIsolation: false, podemos asignar directamente a window
  window.electronAPI = {
    // Abrir links en browsers específicos
    abrirExterno: (url, browser) => ipcRenderer.send('abrir-browser', { url, browser }),
    
    // Explorador de carpetas
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    readDir: (dirPath) => ipcRenderer.invoke('read-dir', dirPath),
    platformSeparator: path.sep
  };
} catch (error) {
  console.error('Error attaching electronAPI:', error);
}
