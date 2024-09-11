import path from "path"
import fs from "fs"


const defaultWindowConfig = {
  height: 600, width: 800,
  showDebugTools: false,
  x: 0, y: 0,
  name: "default",
  menubarVisible: true,
  titleBarStyle: "hidden",
  titleBarOverlay: {
    color: "#2f3241",
    symbolColor: "#74b1be",
    height: 22,
  },
  backgroundThrottling : true,
}

const defaultConfig = {
  windows: {
    main: defaultWindowConfig
  }
}

const configPath = path.join(__dirname, "config.json")

const configuration = new class {
  constructor() {
    this.configuration = null
  }

  readConfig() {
    if (this.configuration === null) {
      // read config file
      const loadedConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : {}
      this.configuration = {
        ...defaultConfig,
        ...loadedConfig,
      }
    }
    return this.configuration
  }

  updateConfig(changes) {
    fs.writeFileSync(configPath, JSON.stringify({...this.configuration, ...changes}))
  }
}

const updateConfig = (changes) => configuration.updateConfig(changes)

const getConfig = () => configuration.readConfig()

export {updateConfig, getConfig, defaultWindowConfig}