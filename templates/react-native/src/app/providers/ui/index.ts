import compose from 'compose-function'
import { withRestart } from './withRestart'
import { withGesture } from './withGesture'
import { withSafeArea } from './withSafeArea'

export const withProviders = compose(withRestart, withGesture, withSafeArea)
