// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { default: initializeServices } = require("./services/services.js");

ipcMain.on("startedup", ({sender}, arg) => {
  console.log("started up")

  sender.send('hello', 'started up!')
})


// todo: create windows as an array
//  update the config file with the window sizes
// Precheck for CPU count
// hide temp if not accurate (above mi)
// no title bar
// no menu bar
// allow moving by dragging the window
// remember window position

const createWindow = ({width, height, webPreferences, url, showDebugTools}) => {
  const window = new BrowserWindow({
    width: width,
    height: height,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: webPreferences,
  });

  window.loadURL(url);

  // Automatically open Chrome's DevTools in development mode.
  if (showDebugTools) {
    window.webContents.openDevTools();
  }
  return window

}
// Create the native browser window.
function createMainWindow() {

  const defaultConfig = {height: 600, width: 800, showDebugTools: !app.isPackaged}

  // read config file
  const configPath = path.join(__dirname, "config.json")
  const loadedConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : {}

  const config = {
    ...defaultConfig,
    ...loadedConfig,
  }

  const webPreferences = {
    preload: path.join(__dirname, "preload.js"),
    height: config.height,
    width: config.width,
  }

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000"

  const window = createWindow({
    ...config,
    webPreferences: webPreferences,
    url: appURL
  });

  window.on('resize', () => {
    const {width, height} = window.getBounds()
    console.log("resize", width, height)

    // save height to a config file
    const config = {
      height: height,
      width: width,
    }

    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(config))
  })

  return window
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
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
  const window = createMainWindow();
  setupLocalFilesNormalizerProxy();

  console.log("initializing services")

  initializeServices(window);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
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
