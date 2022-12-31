import {StyleSheet} from 'react-native'

export const theme = {
  white: '#FFFFFF',
  backgroundScreen: '#F4F4F4',
  statusBarColor: '#1B77DF',
  navbarColor: '#1B77DF',
  textColorPrimary: '#454646',
  textColorSecondary: '#859ED1',
  textColorGrey: '#A09E9E',
  textColorBlue: '#1B77DF',
  textColorHint: '#A09E9E',
  textError: '',
  buttonColorPrimary: '#1B77DF',
}

export const fonts = {
  thin: 'Lato-Thin',
  light: 'Lato-Light',
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  black: 'Lato-Black',
}

export const gstyles = StyleSheet.create({
  typeface: {
    fontFamily: fonts.regular,
  },
  typefaceLight: {
    fontFamily: fonts.light,
  },
  typefaceThin: {
    fontFamily: fonts.thin,
  },
  typefaceBold: {
    fontFamily: fonts.bold,
  },
  typefaceBlack: {
    fontFamily: fonts.black,
  },
  backgroundWhite: {
    backgroundColor: theme.white,
  },
  whiteText: {
    color: theme.white,
  },
  primaryText: {
    color: theme.textColorPrimary,
  },
  secondaryText: {
    color: theme.textColorSecondary,
  },
  greyText: {
    color: theme.textColorGrey,
  },
  blueText: {
    color: theme.textColorBlue,
  },
  errorText: {
    color: theme.textError,
  },
  buttonColorPrimary: {
    color: theme.buttonColorPrimary,
  },
  boxShadow: {
    shadowColor: '#000',
    elevation: 0.4,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.04,
    // shadowRadius: 8,
  },
})
