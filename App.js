import React, { useContext } from 'react';
import Profile from './component/Profile';
import Login from './component/Login';
import Qr_scan from './component/Qr_scan';
import Absence from './component/Absence';
import Attendance from './component/Attendance';
// import Switch_controle from './component/Switch_control';
import Lectures from './component/Lectures';
import { NavigationContainer } from '@react-navigation/native';
import Studing_subject from "./component/Studing_subject"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import { AppContext } from './context/context';

const Stack = createNativeStackNavigator();

const App = () => {
  const { login } = useContext(AppContext)
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      // initialRouteName="Switch_contr"

      >
        {!login ?
          (
            <Stack.Screen
              name="Login" component={Login} />
          )
          : (
            <>
              <Stack.Screen name='Studing_subject' component={Studing_subject} />

              <Stack.Screen name='Lectures' component={Lectures} />
              <Stack.Screen
                name="Profile" component={Profile} />

              <Stack.Screen
                name="Qr_scan" component={Qr_scan} />
              <Stack.Screen
                name="Absence" component={Absence} />
              <Stack.Screen
                name="Attendance" component={Attendance} />

            </>
          )
        }
      </Stack.Navigator>



    </NavigationContainer>
  )
}

export default App;
