import { Alert } from 'react-native'
import { setJSExceptionHandler } from 'react-native-exception-handler'
import RNRestart from 'react-native-restart'
import { ProviderPropsType } from '../types'

export const withRestart = (component: ProviderPropsType) => (props: any) => {
  const errorHandler = (e: any, isFatal: boolean) => {
    if (isFatal) {
      Alert.alert(`${e.name} ${e.message}`)
      RNRestart.Restart()
    }
  }

  setJSExceptionHandler(errorHandler)

  return <>{component(props)}</>
}
