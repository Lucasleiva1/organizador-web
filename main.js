const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { exec } = require('child_process'); 

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Gestor Multi-Cuentas",
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true, 
      preload: path.join(__dirname, 'preload.js'), // Conectamos el puente
    },
  });

  // En desarrollo cargamos tu servidor local (Next.js defaults to 3001 if 3000 is busy)
  const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3001';
  mainWindow.loadURL(startUrl);
}

// --- ESTA ES LA FUNCIÓN QUE ABRE NAVEGADORES ---
ipcMain.on('abrir-browser', (event, { url, browser }) => {
  let command = '';
  
  // Comandos de Windows con rutas completas para forzar navegadores específicos
  switch (browser) {
    case 'chrome': 
      command = `start "" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" "${url}"`; 
      break;
    case 'firefox': 
      command = `start "" "C:\\Program Files\\Mozilla Firefox\\firefox.exe" "${url}"`; 
      break;
    case 'edge': 
      command = `start "" "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" "${url}"`; 
      break;
    case 'opera': 
      command = `start "" "C:\\Users\\${process.env.USERNAME}\\AppData\\Local\\Programs\\Opera\\opera.exe" "${url}"`; 
      break;
    default: 
      shell.openExternal(url); 
      return; // Navegador predeterminado
  }

  console.log(`Ejecutando: ${command}`); // Debug
  exec(command, (err) => {
    if (err) {
      console.error(`Error al abrir ${browser}:`, err);
      // Si falla, intentar con el comando simple
      exec(`start ${browser} "${url}"`, (err2) => {
        if (err2) {
          console.error('Fallback también falló, usando navegador predeterminado');
          shell.openExternal(url);
        }
      });
    }
  });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
