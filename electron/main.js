// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { default: initializeServices } = require("./services/main-window-comms.js");
const { getConfig, updateConfig } = require("./services/configuration.js");

ipcMain.on("startedup", ({ sender }, arg) => {
  console.log("started up")

  sender.send('hello', 'started up!')
})

const saveWindowConfig = (config, configKey) => {
  console.log(`saving window config for ${configKey}`, config)
  updateConfig({ windows: { [configKey]: config } })
}

// todo: create windows as an array
//  update the config file with the window sizes
// hide temp if not accurate (above mi)
// no title bar for main window
// no menu bar for main window
// allow moving by dragging the window
// remember window position

const createWindow = (configuration, windowName) => {
  const {url, showDebugTools} = configuration

  const windowConfig = { url, ...{...configuration, ...configuration.metrics, show: false} }
  console.log("creating window", windowConfig)

  const window = new BrowserWindow(windowConfig);

  window.loadURL(url);

  window.once("ready-to-show", () => {
    window.show()
  })
  window.on("close", () => {
    console.log("window closed", windowName)
    window.removeAllListeners()
    window = null
  })

  const saveMetrics = () => {
    const configToSave = {...configuration}
    if (configToSave.webPreferences) {
      delete configToSave.webPreferences
    }

    saveWindowConfig({...configToSave, metrics: window.getBounds()}, windowName)
  }

  window.on('resize', saveMetrics)

  window.on("moved", saveMetrics)

  // Automatically open Chrome's DevTools in development mode.
  if (showDebugTools) {
    window.webContents.openDevTools();
  }
  return window
}

// Create the native browser window.
function createMainWindow(config) {
  const mainWindowConfig = config.windows.main
  const mainWindowPreload = path.join(__dirname, mainWindowConfig.preload)

  const window = createWindow({
    ...mainWindowConfig,
    url: app.isPackaged
      ? url.format({
        pathname: path.join(__dirname, mainWindowConfig.unpackedFilename),
        protocol: "file:",
        slashes: true,
      })
      : "http://localhost:3000",
    webPreferences: {
      preload: mainWindowPreload
    }
  }, "main");

  return window
}


// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.slice(7);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const config = getConfig()
  if (!config.windows.main) throw new Error("main window config not found - config.json should contain a windows.main object")

  const mainWindow = createMainWindow(config)

  setupLocalFilesNormalizerProxy();

  console.log("initializing services")

  initializeServices(mainWindow);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(config, "main");
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});
