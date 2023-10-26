import { ProviderPropsType } from '../types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const withGesture = (component: ProviderPropsType) => (props: any) => {
  return <GestureHandlerRootView style={{ flex: 1 }}>{component(props)}</GestureHandlerRootView>;
};
