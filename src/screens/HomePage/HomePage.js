import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ThemeContext } from '../../context/Theme';
import themeColors from '../../utils/themeColors';
import { scale } from '../../utils/scaling';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ApiService from '../../utils/apiService';
import Search from '../../ui-components/Search/Search';

const HomePage = () => {
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = themeColors[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme]
  const [apiData,setApiData] = useState([])
  const [filterApiData,setFilterApiData] = useState([])
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState()

  useFocusEffect(React.useCallback(()=>{
    fetchDevicesData()
  },[]))

  useEffect(()=>{
    if(search?.trim()?.length>0){
      const filteredData = apiData.filter(device => {
        const deviceName = device?.display_name || '';  // Default to an empty string if undefined or null
        return (deviceName?.toLowerCase()?.includes(search?.toLowerCase()) ||
        device?.device_id?.toLowerCase()?.includes(search?.toLowerCase()) || 
        device?.model?.toLowerCase()?.includes(search?.toLowerCase()) || 
        device?.latest_device_point?.device_state?.drive_status?.toLowerCase()?.includes(search?.toLowerCase()) || 
        device?.active_state?.toLowerCase()?.includes(search?.toLowerCase()));
      });
      setFilterApiData(filteredData);
    }
  },[search])

  const fetchDevicesData = async()=>{
    setLoader(true)
    let APIKEY = "Xl-8_ceibpMHqr4YZ72uFy5xQfjbOPXstocE8b_Zkmw"
    let api = `https://track.onestepgps.com/v3/api/public/device?latest_point=true&api-key=${APIKEY}`
    // const response = await fetch(api);
    const response = await ApiService.get(api);
    setApiData(response?.result_list || [])
    setFilterApiData(response?.result_list || []);
    setLoader(false)
  }

  const DeviceCard = ({ device }) => {
    return (
      <TouchableOpacity 
        onPress={() => { navigation.navigate('DeviceDetails', { device }) }} 
        style={[styles.card,{backgroundColor:colors?.cardBg}]}
      >
        <Text style={[styles.deviceName,{color:colors?.heading}]}>{device?.display_name}</Text>
        
        <View style={styles.deviceInfoContainer}>
          <Text style={[styles.deviceInfo,{color:colors?.heading}]}>Device ID: {device?.device_id}</Text>
          <Text style={[styles.deviceInfo,{color:colors?.heading}]}>Model: {device?.model}</Text>
          <Text style={[styles.deviceInfo,{color:colors?.heading}]}>Drive Status: {device?.latest_device_point?.device_state?.drive_status}</Text>
          <Text style={[styles.deviceInfo,{color:colors?.heading}]}>Drive Distance: {device?.latest_device_point?.device_state?.drive_status_lat_lng_distance?.display}</Text>
          <Text style={[styles.deviceInfo,{color:colors?.heading}]}>Odometer: {device?.latest_device_point?.device_state?.odometer?.display}</Text>
  
        </View>
        <Text style={[styles.statusText, {color:device?.active_state === 'active'?colors?.success:colors?.pending}]}>
          {device?.active_state }
          {/* {device?.active_state === 'active' ? 'Active' : 'Inactive'} */}
        </Text>
      </TouchableOpacity>
    );
  };


  let Logo = require('../../Assets/toolbar-logo.png')


  return (
    <View style={{flex:1,backgroundColor: colors?.backgroundColor, }}>
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', backgroundColor: colors?.navColor,padding:scale(5),paddingHorizontal:scale(10)}}>
            <Image source={Logo} 
                  style={{height: scale(40),width:  scale(150),resizeMode:'contain'}} 
              />
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => { setAppColorTheme((appColorTheme=='systemDefault'?systemThemeMode:appColorTheme)=='light'?'dark':'light')}} 
            >
          <MaterialIcons style={{ fontSize: scale(25), fontWeight: 'bold', color:colors?.themeIcon}} name={(appColorTheme=='systemDefault'?systemThemeMode:appColorTheme)=='light'?'light-mode':'dark-mode'} />
        </TouchableOpacity>
      </View>
      {!loader && <Search customStyle={{width:scale(340)}} setSearch={setSearch} search={search} />}
      {!loader ? <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  style={[styles.container,{backgroundColor: colors?.backgroundColor,}]}>
        {filterApiData?.map((device, index) => (
          <DeviceCard key={index} device={device} />
        ))}
      </ScrollView>:  
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="large"
            color={colors?.appThemeSecondary}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      }
      {filterApiData?.length == 0 && !loader && <View style={{display:"flex",justifyContent:"center",alignItems:"center",height:scale(400)}}>
          <Text style={{textAlign:'center'}}>No Items</Text>
      </View>}
    </View>
  );
};

export default HomePage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    padding: scale(10),
    borderRadius: scale(10),
    marginVertical: scale(5),
    elevation: 3, // Add shadow effect on Android
    shadowColor: '#000', // iOS shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position:'relative'
  },
  deviceName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  deviceInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  deviceInfo: {
    fontSize: scale(12),
    color: '#333',
    marginBottom: scale(3),
  },
  statusText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    position:'absolute',
    bottom:scale(8),
    right:scale(8)
  },
});