import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native'
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../../theme.js';
import SignInOrOut from './SignInOrOut'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 30,
    paddingLeft: 20,
    backgroundColor: theme.appBarBackground.backgroundColor,
    height: 100,
    justifyContent: 'space-between'
  },
  scroll: {
    horizontal: true
  },
  tabs: {
    paddingHorizontal: 12
    
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.subheading
  }
});


const AppBar = () => {

  return (<View style={styles.container}>
    <ScrollView horizontal style={styles.scroll}>
    <Pressable><Link to="/"><View style={styles.tabs}><Text style={styles.text}>Repositories</Text></View></Link></Pressable>
    <SignInOrOut />
    <Pressable><View style={styles.tabs}><Text style={styles.text}></Text></View></Pressable>
    </ScrollView>
  </View>);
};

export default AppBar;