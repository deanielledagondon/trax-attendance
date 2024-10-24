const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onScanSuccess: (data) => ipcRenderer.send('scan-success', data),
  updateAttendance: (callback) => ipcRenderer.on('update-attendance', callback)
});
