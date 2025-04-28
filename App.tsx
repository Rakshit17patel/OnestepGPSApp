/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { SaveData as StoreItem,RetrieveData as getItemData } from './src/utils/AsyncStorageHandeler';
import Theme from './src/utils/themeColors';
// import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from './src/context/Theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import NavigationServices from './src/utils/NavigationServices';
import Router from './src/routing/Router';
import AppLoader from './src/screens/AppLoader';
import { createStackNavigator } from '@react-navigation/stack';
import { getScreenBuilder } from './src/routing/ScreenRegistry';
import HomePage from './src/screens/HomePage/HomePage';
import DeviceDetailPage from './src/screens/DeviceDetailPage/DeviceDetailPage';


const Stack = createStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [appColorTheme, setAppColorTheme] = useState('')
  const systemThemeMode = useColorScheme()
  const colors = Theme[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme]


  useEffect(() => {
    checkThemeMode()
  }, [])

  useEffect(() => {
    assignThemeMode()
  }, [appColorTheme])

  
  const checkThemeMode = async ()=>{
    let theme = await getItemData('theme');
    setAppColorTheme(theme);
    // SplashScreen.hide()
  }

  const assignThemeMode = async ()=>{
    if (!appColorTheme) {
      let theme = 'systemDefault'
      setAppColorTheme(theme)
      await saveAppColorTheme(theme) // systemThemeMode
    }
    else{
      await saveAppColorTheme(appColorTheme)
    }
  }

  const saveAppColorTheme = async (value:any) => {
    await StoreItem('theme', JSON.stringify(value))
  }




  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors?.navColor,
      text: colors?.heading
    },
  };

  const HomePage = () => {
    return (
      <View>
        <Text>Home Page</Text>
      </View>
    );
  };
  
  const DeviceDetailPage = () => {
    return (
      <View>
        <Text>Device Details Page</Text>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors?.navColor}}>
    <SafeAreaProvider >
      <StatusBar backgroundColor={colors?.appThemeBottomTabColor} barStyle={'light-content'}/>
      <ThemeContext.Provider value={{ systemThemeMode,appColorTheme, setAppColorTheme }}>
        <NavigationContainer theme={navTheme} ref={(ref) => NavigationServices.setTopLevelNavigator(ref)}>
              {/* <Router /> */}
              <AppLoader />
               {/* <Stack.Navigator initialRouteName="Home" screenOptions={{
                          headerMode: 'screen',
                      }}>
                    <Stack.Screen key="Home" name="Home" component={HomePage} options={{headerShown: false }} />
                    <Stack.Screen key="DeviceDetails" name="DeviceDetails" component={DeviceDetailPage} options={{headerShown: false }} />
                </Stack.Navigator> */}
        </NavigationContainer>
        {/* <PaperProvider theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: colors?.appThemePrimary,
            },
          }}>
        </PaperProvider> */}
    </ThemeContext.Provider>
    </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
