import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBar: '#ffffff',
    appBackground: '#e1e4e8',
    warning: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appbar: 24
  },
  fonts: {
    main:  Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  appBarBackground: {
    backgroundColor: '#24292e',
  },
  appBarText: {
    body: 24,
  }
};

export default theme;