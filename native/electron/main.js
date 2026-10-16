// Ascent Academy desktop app (Windows + macOS). Opens the live site in its own window,
// so every update you publish appears here automatically with no new installer.
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const cfg = require('../app.config.json');

if (!app.requestSingleInstanceLock()) { app.quit(); }
let win = null;
const origin = new URL(cfg.url).origin;
const same = u => { try { return new URL(u).origin === origin; } catch (e) { return false; } };

function create() {
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 420, minHeight: 600,
    backgroundColor: '#FFFFFF', title: cfg.name,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false }
  });
  win.setMenuBarVisibility(false);
  win.loadURL(cfg.url);
  // links to other sites open in the normal browser; the app itself stays on your site
  win.webContents.setWindowOpenHandler(({ url }) => { if (same(url)) return { action: 'allow' }; shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!same(url) && !url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); } });
  win.webContents.on('did-fail-load', (e, code, desc, url, isMainFrame) => {
    if (isMainFrame && code !== -3) win.loadFile(path.join(__dirname, 'offline.html'), { query: { u: cfg.url } });
  });
  win.on('closed', () => { win = null; });
}
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  create();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) create(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
