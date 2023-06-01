import 'intl';
import 'intl/locale-data/jsonp/de';
import { NativeBaseProvider } from 'native-base';
import { Platform } from 'react-native';

import { ItemProvider } from './src/context/TaskContext';
import { Routes } from './src/routes';

if (Platform.OS === 'android') {
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}
export default function App() {
  return (
    <ItemProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </ItemProvider>
  );
}
