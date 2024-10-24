const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow, attendanceWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    frame: false,     // Remove window frame (toolbar)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload file is in the same folder as main.js
      nodeIntegration: true,
      contextIsolation: true,
    }
  });
  
  mainWindow.loadFile(path.join(__dirname, 'attendance.html')); 

  attendanceWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      nodeIntegration: true
    }
  });

  attendanceWindow.loadFile(path.join(__dirname, 'attendance.html')); 
  attendanceWindow.hide(); // Start hidden until QR code scan
});

ipcMain.on('scan-success', (event, userData) => {
  // Show attendance window and pass the data to display
  attendanceWindow.show();
  attendanceWindow.webContents.send('update-attendance', userData);
});
