/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AppContextProvider from './context/context';
const MainApp = () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    )
}
AppRegistry.registerComponent(appName, () => MainApp);
