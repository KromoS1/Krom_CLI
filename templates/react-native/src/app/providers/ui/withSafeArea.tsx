import { ProviderPropsType } from '../types';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export const withSafeArea = (component: ProviderPropsType) => (props: any) => {
  return <SafeAreaProvider>{component(props)}</SafeAreaProvider>;
};
