import app from './config/app.json'

const versionCode = 1
const version = '1.0.0'
const sdkVersion = '49.0.0'

const dev_version = '1'

const identifier = {
  app: 'by.fishing-trophies',
  dev: 'by.fishing-trophies.dev',
}

const ios_config = {
  supportsTablet: true,
}

const android_config = {
  adaptiveIcon: {
    backgroundColor: '#FFFFFF',
  },
}

const mainPlugins = ['expo-build-properties', 'expo-localization']

const getVersion = identifier =>
  identifier === identifier.dev ? `${version}.${dev_version}` : `${version}`

const getMainConfig = (config, identifier) => {
  config.expo.version = version
  config.expo.sdkVersion = sdkVersion

  config.expo.extra = { ...config.expo.extra, version: getVersion(identifier), versionCode }

  return config
}

const getConfigAndroid = (config, identifier) => {
  const finalConfig = getMainConfig(config, identifier)

  finalConfig.expo.platforms = ['android']
  finalConfig.expo.ios = { ...android_config }

  finalConfig.expo.android = {
    package: identifier,
    versionCode,
  }

  finalConfig.plugins = [
    ...mainPlugins,
    {
      android: {
        compileSdkVersion: 34,
        targetSdkVersion: 34,
        buildToolsVersion: '34.0.0',
      },
    },
  ]

  return finalConfig
}

const getConfigIos = (config, identifier) => {
  const finalConfig = getMainConfig(config, identifier)

  finalConfig.expo.platforms = ['ios']
  finalConfig.expo.ios = { ...ios_config }

  finalConfig.plugins = [
    ...mainPlugins,
    {
      ios: {
        deploymentTarget: '14.0',
      },
    },
  ]

  finalConfig.expo.ios = {
    bundleIdentifier: identifier,
    buildNumber: `${versionCode}`,
  }

  return finalConfig
}

module.exports = () => {
  switch (process.env.APP_ENV) {
    case 'ANDROID': {
      return getConfigAndroid(app, identifier.app)
    }
    case 'IOS': {
      return getConfigIos(app, identifier.app)
    }
  }
}
