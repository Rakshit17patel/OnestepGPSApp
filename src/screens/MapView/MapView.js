import React, {useContext, useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomMarker from '../../Assets/CustomMarker';
import {mapDarkMode} from '../../utils/mapDarkMode';
import {ThemeContext} from '../../context/Theme';
import themeColors from '../../utils/themeColors';
import {scale} from '../../utils/scaling';
import ApiService from '../../utils/apiService';
import {RetrieveData as getItemData} from '../../utils/AsyncStorageHandeler';
import config from '../../utils/config';

const LATITUDE = 37.7749;
const LONGITUDE = -122.4194;
const LATITUDE_DELTA = 40;
const LONGITUDE_DELTA = 40;

export default function Track({route}) {
  const navigationObj = useNavigation();
  const {systemThemeMode, appColorTheme} = useContext(ThemeContext);
  const colors =
    themeColors[
      appColorTheme === 'systemDefault' ? systemThemeMode : appColorTheme
    ];

  const [apiData, setApiData] = useState([]);
  const [coordinates, setCoordinates] = useState({
    latitude: route?.params?.latitude || LATITUDE,
    longitude: route?.params?.longitude || LONGITUDE,
    latitudeDelta: route?.params?.latitude ? 0.003 : LATITUDE_DELTA,
    longitudeDelta: route?.params?.longitude ? 0.003 : LONGITUDE_DELTA,
  });

  useFocusEffect(
    React.useCallback(() => {
      fetchDevicesData();
      const intervalId = setInterval(fetchDevicesData, 10000);
      return () => clearInterval(intervalId);
    }, []),
  );

  const fetchDevicesData = async () => {
    try {
      const api = `${config.API_URL}/device?latest_point=true&api-key=${config.API_KEY}`;
      const response = await ApiService.get(api);
      const localData = await getItemData('apiData');
      const enriched = response?.result_list?.map(apiItem => {
        const localItem = localData?.find(
          l => l.device_id === apiItem.device_id,
        );
        return localItem ? {...apiItem, ...localItem} : apiItem;
      });
      setApiData(enriched || []);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };

  useLayoutEffect(() => {
    navigationObj.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Tracking',
      headerStyle: {backgroundColor: colors.navColor},
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigationObj.goBack()}
          style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            style={[styles.backIcon, {color: colors.heading}]}
          />
        </TouchableOpacity>
      ),
    });
  }, [colors]);

  if (!apiData.length) return null;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={ref => (this.mapRef = ref)}
        style={styles.map}
        initialRegion={coordinates}
        region={coordinates}
        customMapStyle={
          appColorTheme === 'systemDefault'
            ? systemThemeMode === 'dark'
              ? mapDarkMode
              : []
            : appColorTheme === 'dark'
            ? mapDarkMode
            : []
        }
        showsUserLocation
        showsMyLocationButton
        zoomEnabled
        rotateEnabled
        showsCompass
        showsBuildings
        zoomControlEnabled
        loadingEnabled
        loadingIndicatorColor={colors.appThemePrimary}
        mapType="standard">
        {apiData.map((device, index) => (
          <Marker
            key={device.device_id}
            title={`${device.display_name} (${device.latest_device_point?.device_state?.drive_status})`}
            description={device.active_state}
            coordinate={{
              latitude: device.latest_device_point?.lat,
              longitude: device.latest_device_point?.lng,
            }}
            pinColor={colors.appThemeSecondary}
            tracksViewChanges={false}>
            <CustomMarker
              index={index}
              displayName={device.display_name}
              width={scale(20)}
              height={scale(50)}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  backButton: {
    padding: scale(10),
  },
  backIcon: {
    fontSize: scale(25),
    fontWeight: 'bold',
  },
});
