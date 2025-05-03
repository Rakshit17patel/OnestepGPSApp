import React, { useContext, useRef } from 'react'
import { View, TouchableOpacity, TextInput, useColorScheme } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import theme from '../../utils/themeColors'
import { scale } from '../../utils/scaling'
import { ThemeContext } from '../../context/Theme'
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import LottieView from 'lottie-react-native'

function Search(props) {
  var inputRef = useRef(null);
  const { systemThemeMode,appColorTheme, setAppColorTheme} = useContext(ThemeContext)
  const colors = theme[appColorTheme=='systemDefault'?systemThemeMode:appColorTheme];

  React.useEffect(() => {
    if(props?.inputActive){
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [props?.inputActive]);
  return (
      <View style={{...styles(colors).mainContainer,borderRadius:scale(10),...props.customStyle}}>
        <View style={styles().subContainer}>
          <View style={styles().leftContainer}>
            <View style={styles().searchContainer}>
              <TouchableOpacity activeOpacity={0.5} style={{flex:1,justifyContent: 'center',alignItems: 'center',margin:0,padding:0}} onPress={props?.backPress}>
                <AntDesign
                  name={props?.backPress?"arrowleft":"search1"}
                  color={colors?.searchIcons}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles().inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles(colors).bodyStyleOne}
                placeholder={"Search for a device to view"}
                placeholderTextColor={colors?.searchIcons}
                onChangeText={text => {props?.setSearch(text)}}
                onPressIn={()=>props?.onPressInEvent?(props?.onPressInEvent(),inputRef?.current?.blur()):null}
                defaultValue={props?.search}
                // value={props?.search}
              />
            </View>
          </View>
          <View style={styles().filterContainer}>
            {props?.search && (
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => {
                  props?.setSearch('')
                }}>
                <AntDesign
                  // name="closecircleo"
                  name="close"
                  size={scale(18)}
                  color={colors?.searchIcons}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  )
}

export default Search
