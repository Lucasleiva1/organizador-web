const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí exponemos la función segura
  abrirExterno: (url, browser) => ipcRenderer.send('abrir-browser', { url, browser })
});
