import React, { useContext } from 'react'
import Svg, { Path } from 'react-native-svg'
import { View, StatusBar, TouchableOpacity, Linking,Text, useColorScheme } from 'react-native'
import theme from '../utils/themeColors'
import { scale } from '../utils/scaling'
import { Callout } from 'react-native-maps'

function CustomMarker(props) {
  const currentTheme = theme[useColorScheme()]
  return (
    <View style={{position: 'relative', }}>
      {/* <Callout>
                            <View style={{maxWidth: scale(200),}}>
                              <Text bold style={{ fontSize:scale(14),color:'white' }}>{props?.displayName}</Text>
                              <Text bold style={{ fontSize:scale(12),color:'green' }}>{props?.displayName}</Text>
                            </View>
                          </Callout> */}
      <Svg viewBox="0 0 512 512" {...props}>
        <Path
          fill={currentTheme?.appThemeSecondary}
          d="M256 103.278c-39.429 0-71.505 32.077-71.505 71.505 0 39.429 32.077 71.505 71.505 71.505s71.505-32.077 71.505-71.505-32.076-71.505-71.505-71.505z"
        />
        <Path
          fill={currentTheme?.appThemeSecondary}
          d="M256 0C158.107 0 78.465 79.642 78.465 177.535c0 40.042 28.089 106.034 83.486 196.143 40.502 65.88 81.577 121.48 81.987 122.033L256 512l12.062-16.289c.41-.553 41.485-56.153 81.987-122.033 55.397-90.109 83.486-156.101 83.486-196.143C433.535 79.642 353.893 0 256 0zm0 276.306c-55.98 0-101.522-45.543-101.522-101.522 0-55.98 45.543-101.522 101.522-101.522s101.522 45.543 101.522 101.522c0 55.979-45.542 101.522-101.522 101.522z"
        />
      </Svg>
      <Text bold numberOfLines={1} ellipsizeMode="tail" style={{ right: 1, top: -2,fontSize:scale(14),position:'absolute',color:'white' }}>
        {/* <Text bold style={{ fontSize:scale(14),color:'white' }}>{props?.index+1}</Text> #{props?.displayName} */}
        <Text bold style={{ fontSize:scale(14),color:'white' }}>#{props?.index+1}             </Text>
      </Text>
      <Text bold numberOfLines={1} ellipsizeMode="tail" style={{ right: -1, top: -2,fontSize:scale(14),position:'absolute',color:'white' }}>
        <Text bold style={{ fontSize:scale(14),color:'white' }}>#{props?.index+1}             </Text>
      </Text>
      <Text bold numberOfLines={1} ellipsizeMode="tail" style={{ right: 1, top: -2,fontSize:scale(14),position:'absolute',color:'black' }}>
        <Text bold style={{ fontSize:scale(14),color:'red' }}>#{props?.index+1}             </Text>
      </Text>
      
    </View>
  )
}

export default CustomMarker
