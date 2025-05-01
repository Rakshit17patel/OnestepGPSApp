import React, { useState, useContext, useLayoutEffect, useRef,useCallback, useEffect } from 'react'
import { View, TouchableOpacity, StatusBar, Linking, useColorScheme, ScrollView, Alert, StyleSheet } from 'react-native'
import MapView, {  Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import CustomMarker from '../../Assets/CustomMarker'
import theme from '../../utils/themeColors';
import { mapDarkMode } from '../../utils/mapDarkMode'
import { ThemeContext } from '../../context/Theme'
import LottieView from 'lottie-react-native';
import { scale } from '../../utils/scaling';
import ApiService from '../../utils/apiService'
import Ionicons from 'react-native-vector-icons/Ionicons'


const LATITUDE = 37.7749
const LONGITUDE = -122.4194
const LATITUDE_DELTA = 40
const LONGITUDE_DELTA = 40


export default function Track(props) {
  // const Analytics = analytics()
  const navigationObj = useNavigation();
  var [route, setRoute] = useState([]);
  const [apiData,setApiData] = useState([])
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = theme[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme];
  const { longitude, latitude, ordersLocation, origin={ latitude: 37.7749, longitude: -122.4194 }, destination={ latitude: 37.78825, longitude: -122.4324 },routeToken,encodedPolylines } = props?.route?.params || {}
  const navigation = useNavigation()
  const [coordinates, setCorrdinates] = useState({
    longitudeDelta: longitude ? 0.003 : LONGITUDE_DELTA,
    latitudeDelta: latitude ? 0.003 : LATITUDE_DELTA,
    longitude: longitude || LONGITUDE,
    latitude: latitude || LATITUDE,
  })

    useFocusEffect(React.useCallback(()=>{
      fetchDevicesData()
    },[]))
  
    const fetchDevicesData = async()=>{
      let APIKEY = "Xl-8_ceibpMHqr4YZ72uFy5xQfjbOPXstocE8b_Zkmw"
      let api = `https://track.onestepgps.com/v3/api/public/device?latest_point=true&api-key=${APIKEY}`
      // const response = await fetch(api);
      const response = await ApiService.get(api);
      setApiData(response?.result_list || [])
    }

  let mapRef = null
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerTitleAlign: 'center',
      title:'Tracking',
      headerStyle: {
        backgroundColor: colors?.navColor
      },
      headerBackTitleVisible: false,
      headerLeft: () =>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigationObj.goBack()}} style={{padding:scale(10)}}>
            <Ionicons
              name="arrow-back"
              style={{fontSize: scale(25), fontWeight: 'bold',color: props.fontColor,...props?.headerLeft?.styles}}
            />
        </TouchableOpacity>,
    })
  })

  return (
    <>
      <View style={{flex:1}}>
      {coordinates && apiData?.length>0 && <MapView
          ref={ref => {
            mapRef = ref
          }}
          initialRegion={coordinates}
          // initialRegion={{
          //   longitudeDelta: 0.003,
          //   latitudeDelta: 0.003,
          //   longitude: 77.59104670126453,
          //   latitude: 13.04269368886535,
          // }}
          region={coordinates}
          // region={{
          //   longitudeDelta: 0.003,
          //   latitudeDelta: 0.003,
          //   longitude: 77.59104670126453,
          //   latitude: 13.04269368886535,
          // }}
          style={{ height: '100%' }}
          provider={PROVIDER_GOOGLE}
          showsTraffic={false}
          zoomEnabled = {true}
          zoomTapEnabled={true}
          cameraZoomRange={{
            minCenterCoordinateDistance: 0,
            maxCenterCoordinateDistance: 20,
            animated: true
          }}
          maximumZ={20}
          flipY={false}
          customMapStyle={appColorTheme=='systemDefault'?systemThemeMode:appColorTheme === 'dark' ? mapDarkMode : []}
          userInterfaceStyle={appColorTheme=='systemDefault'?systemThemeMode:appColorTheme === 'dark' ? mapDarkMode :'light'}
          showsUserLocation
          showsMyLocationButton
          loadingEnabled={true}
          loadingIndicatorColor={colors.appThemePrimary}
          zoomControlEnabled={true}
          rotateEnabled={true}
          moveOnMarkerPress={true}
          liteMode={false}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
          showsCompass={true}
          showsBuildings={true}
          mapType={"standard"}

          // maxZoomLevel={20}
          // minZoomLevel={0}
          // showsScale={true}
          // scrollDuringRotateOrZoomEnabled={true}
        >
          
          {apiData?.map((device,index) =>
              <Marker key={index} coordinate={({ latitude: (device?.latest_device_point?.lat), longitude: (device?.latest_device_point?.lng) })} style={{}} >
                    {<CustomMarker index={index} displayName={device?.display_name} width={ scale(60)} height={scale(50)} />}
              </Marker>
            )}
          {/* <Marker coordinate={({ latitude: parseFloat(origin?.latitude), longitude: parseFloat(origin?.longitude) })} style={{}}>
            </Marker> */}

            {/* {route?.length > 0 && <Polyline coordinates={route} strokeWidth={4} strokeColor="#2292E3" />} */}
        
          </MapView>}
      </View>
    </>
  )
}
