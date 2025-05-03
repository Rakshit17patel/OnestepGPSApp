import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { scale } from '../../utils/scaling';
import { ThemeContext } from '../../context/Theme';
import themeColors from '../../utils/themeColors';
import { SaveData as StoreItem,RetrieveData as getItemData } from '../../utils/AsyncStorageHandeler';


export default function DeviceDetailPage({ route }) {
  const [deviceData, setDeviceData] = useState(route.params?.device)
  const [tempDeviceData, setTempDeviceData] = useState(route.params?.device)
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = themeColors[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme]
  const navigationObj = useNavigation()
  const [edit,setEdit] = useState(false)


  useLayoutEffect(() => {
    navigationObj.setOptions({
      headerShown:true,
      headerTitleAlign: 'center',
      title:deviceData?.display_name +` (${deviceData?.latest_device_point?.device_state?.drive_status})`,
      headerStyle: {
        backgroundColor: colors?.navColor
      }
    });
  }, [navigationObj, deviceData]);

  const saveDeviceInfo = async()=>{
    try{
      setDeviceData(tempDeviceData)
      await StoreItem('apiData', JSON.stringify(route?.params?.apiData?.map(data=>{
        if(data?.device_id == tempDeviceData?.device_id){
          return tempDeviceData
        }
        else{
          return data
        }
      })))
      setEdit(false)
    }
    catch(error){
    console.log("🚀 ~ file: DeviceDetailPage.js ~ line 44 ~ saveDeviceInfo ~ error", error)
      
    }
  }

  useEffect(()=>{
  console.log("🚀 ~ file: DeviceDetailPage.js ~ line 36 ~ useEffect ~ useEffect",edit)
  },[edit])

  const handleEditPress = useCallback(() => {
    console.log("Edit button pressed");
    setEdit(true);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[styles.container,{backgroundColor: colors?.backgroundColor,}]}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{deviceData.display_name}</Text>
        <MaterialIcons 
          name="device-unknown" 
          style={styles.deviceIcon}
        />
      </View> */}


      {/* Basic Information */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg,}]}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Basic Information</Text>
          <TouchableWithoutFeedback  activeOpacity={0.5} style={{}} onPress={handleEditPress}>
            <MaterialIcons  style={{fontSize: scale(25), fontWeight: 'bold',color: colors?.appThemeSecondary}} name={"edit"}  />         
          </TouchableWithoutFeedback >
        </View>
        <Text style={[styles.text,{color:colors?.heading}]}>Device ID: {deviceData.device_id}</Text>
        {/* <Text style={[styles.text,{color:colors?.heading}]}>Device Status: <Text style={{color:deviceData?.active_state === 'active'?colors?.success:colors?.pending}}>{deviceData.active_state}</Text></Text> */}
        <Text style={[styles.text,{color:colors?.heading}]}>Make: {deviceData.make}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Model: {deviceData.model}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Factory ID: {deviceData.factory_id}</Text>
      </View>

      {/* Location */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Location</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Latitude: {deviceData?.latest_device_point?.lat?.toFixed(5)}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Longitude: {deviceData?.latest_device_point?.lng?.toFixed(5)}</Text>
      </View>

      {/* Device Status */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Device Status</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Status: <Text style={{color:deviceData?.active_state === 'active'?colors?.success:colors?.pending}}>{deviceData.active_state}</Text></Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Drive Status: {deviceData?.latest_device_point?.device_state?.drive_status}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Last Updated: {deviceData?.latest_device_point?.dt_server}
        </Text>
      </View>

      {/* Odometer and Engine Hours */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Odometer and Engine Hours</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Odometer: {deviceData?.odometer?.display}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Engine RPM: {deviceData?.latest_device_point?.params?.eng_rpm}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Engine Hours: {deviceData?.settings?.engine_hours_counter_config}
        </Text>
      </View>

      {/* Fuel Information */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Fuel Consumption</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Fuel Type: {deviceData?.settings?.fuel_consumption?.fuel_type}
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Fuel Economy: {deviceData?.settings?.fuel_consumption?.fuel_economy} mpg
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Fuel Cost: ${deviceData?.settings?.fuel_consumption?.fuel_cost}</Text>
      </View>

      {/* Timeouts and Retention */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Timeouts & Retention</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Drive Timeout: {deviceData?.settings?.drive_timeout?.display}
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          History Retention: {deviceData?.settings?.history_retention_days} days
        </Text>
      </View>

      
      {/* Modal for editing device information */}
      {edit && <Modal
        visible={true}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEdit(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Edit Device Info</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 15,
              }}
              defaultValue={deviceData.display_name}
              onChangeText={(text) => setTempDeviceData({ ...tempDeviceData, display_name: text })}
              placeholder="Display Name"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 15,
              }}
              defaultValue={deviceData.make}
              onChangeText={(text) => setTempDeviceData({ ...tempDeviceData, make: text })}
              placeholder="Make"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 15,
              }}
              defaultValue={deviceData.model}
              onChangeText={(text) => setTempDeviceData({ ...tempDeviceData, model: text })}
              placeholder="Model"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 15,
              }}
              defaultValue={deviceData.factory_id}
              onChangeText={(text) => setTempDeviceData({ ...tempDeviceData, factory_id: text })}
              placeholder="Factory ID"
            />
            <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: 'center', gap: scale(10) }}>
                <TouchableOpacity
                  onPress={saveDeviceInfo}
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: colors?.appThemeSecondary,
                    paddingVertical: scale(10),
                    paddingHorizontal: scale(20),
                    borderRadius: scale(5),
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setEdit(false)}
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: colors?.appThemeSecondary,
                    paddingVertical: scale(10),
                    paddingHorizontal: scale(20),
                    borderRadius: scale(5),
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
  },
  deviceIcon: {
    fontSize: scale(40),
    color: '#333',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  text: {
    fontSize: scale(14),
    marginBottom: 5,
    color: '#555',
  },
});
