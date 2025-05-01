import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { scale } from '../../utils/scaling';
import { ThemeContext } from '../../context/Theme';
import themeColors from '../../utils/themeColors';


export default function DeviceDetailPage({ route }) {
  const { device } = route.params; 
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = themeColors[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme]
  const navigationObj = useNavigation()


  useLayoutEffect(() => {
    navigationObj.setOptions({
      headerShown:true,
      headerTitleAlign: 'center',
      title:device?.display_name,
      headerStyle: {
        backgroundColor: colors?.navColor
      }
    });
  }, [navigationObj]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[styles.container,{backgroundColor: colors?.backgroundColor,}]}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{device.display_name}</Text>
        <MaterialIcons 
          name="device-unknown" 
          style={styles.deviceIcon}
        />
      </View> */}

      {/* Basic Information */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Basic Information</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Device ID: {device.device_id}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Make: {device.make}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Model: {device.model}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Factory ID: {device.factory_id}</Text>
      </View>

      {/* Location */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Location</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Latitude: {device?.latest_device_point?.lat?.toFixed(5)}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Longitude: {device?.latest_device_point?.lng?.toFixed(5)}</Text>
      </View>

      {/* Device Status */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Device Status</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Status: {device.active_state}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Drive Status: {device?.device_state?.drive_status}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Last Updated: {device?.latest_device_point?.dt_server}
        </Text>
      </View>

      {/* Odometer and Engine Hours */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Odometer and Engine Hours</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Odometer: {device?.odometer?.display}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Engine RPM: {device?.latest_device_point?.params?.eng_rpm}</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Engine Hours: {device?.settings?.engine_hours_counter_config}
        </Text>
      </View>

      {/* Fuel Information */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Fuel Consumption</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Fuel Type: {device?.settings?.fuel_consumption?.fuel_type}
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Fuel Economy: {device?.settings?.fuel_consumption?.fuel_economy} mpg
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>Fuel Cost: ${device?.settings?.fuel_consumption?.fuel_cost}</Text>
      </View>

      {/* Timeouts and Retention */}
      <View style={[styles.section,{backgroundColor:colors?.cardBg}]}>
        <Text style={[styles.sectionTitle,{color:colors?.heading}]}>Timeouts & Retention</Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          Drive Timeout: {device?.settings?.drive_timeout?.display}
        </Text>
        <Text style={[styles.text,{color:colors?.heading}]}>
          History Retention: {device?.settings?.history_retention_days} days
        </Text>
      </View>
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
