import { fontStyles } from '../../utils/fontStyles'
import { scale, verticalScale } from '../../utils/scaling'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { theme } from '../../utils/themeColors'

const styles = (props = null) =>
  StyleSheet.create({
    bodyStyleOne: {
      fontFamily: fontStyles.CobblerSansSemiBold,
      fontSize: scale(14),
      color: props != null ? props.fontMainColor : 'black'
    },
    mainContainer: {
      width: '90%',
      elevation:2,
      height: scale(40),
      backgroundColor:'red',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: scale(5),
      backgroundColor: props != null ? props.cartContainer : 'white',
      shadowColor: props != null ? props.shadowColor : 'black',
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.2,
      shadowRadius: verticalScale(1),
      marginVertical:scale(10)
      // ...alignment.MTlarge,
      // ...alignment.MBmedium,
      // ...alignment.Msmall,
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
      width: '90%'
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
      ...alignment.MLxSmall,
    },
    inputContainer: {
      width: '90%',
      justifyContent: 'center',
      // ...alignment.MLxSmall,
      ...alignment.MRxSmall
    },
  })
export default styles
