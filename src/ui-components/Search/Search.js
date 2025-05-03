import React, { useContext, useRef } from 'react'
import { View, TouchableOpacity, TextInput, useColorScheme, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import theme from '../../utils/themeColors'
import { scale, verticalScale } from '../../utils/scaling'
import { ThemeContext } from '../../context/Theme'

function Search(props) {
  var inputRef = useRef(null);
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = theme[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme];

  return (
      <View style={{...styles?.mainContainer,borderRadius:scale(10),backgroundColor:colors?.cardBg,...props.customStyle}}>
        <View style={styles?.subContainer}>
          <View style={styles?.leftContainer}>
            <View style={styles?.inputContainer}>
              <TextInput
                ref={inputRef}
                style={{fontSize: scale(14),color:colors?.heading}}
                placeholder={"Search for a device name, model, status......."}
                placeholderTextColor={colors?.heading}
                onChangeText={text => {props?.setSearch(text)}}
                defaultValue={props?.search}
                // value={props?.search}
              />
            </View>
          </View>
          <View style={styles?.filterContainer}>
            {props?.search && (
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => {
                  props?.setSearch('')
                }}>
                <AntDesign
                  // name="closecircleo"
                  name="close"
                  size={scale(18)}
                  color={colors?.appThemeSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  )
}

export default Search


const styles = StyleSheet.create({
    mainContainer: {
      width: '90%',
      elevation:2,
      height: scale(40),
      backgroundColor:'red',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: scale(5),
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.2,
      shadowRadius: verticalScale(1),
      marginTop:scale(10),
      marginBottom:scale(5),
      marginHorizontal:scale(10),
      borderColor: "#1ba6ff",
      borderWidth: scale(1),
      paddingHorizontal:scale(5),
    },
    subContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      // backgroundColor:'blue',
    },
    leftContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    filterContainer: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchContainer: {
      width: '10%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // ...alignment.MBxSmall
    },
    inputContainer: {
      width: '90%',
      justifyContent: 'center',
      // ...alignment.MLxSmall,
    },
  })