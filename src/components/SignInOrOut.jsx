import { View, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'
import Text from './Text';
import theme from '../../theme.js';
import { useQuery } from '@apollo/client';
import { GET_AUTH_STATUS } from '../graphql/queries';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  tabs: {
    paddingHorizontal: 12
    
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.subheading
  }
});

const SignInOrOut = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  }
  
  const { data, error, loading } = useQuery(GET_AUTH_STATUS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>
  if (data.me) {
    return (
      <Pressable onPress={logOut}><View style={styles.tabs}><Text style={styles.text}>Sign out</Text></View></Pressable>
    )
  }

  return (
    <Pressable><Link to="/signin"><View style={styles.tabs}><Text style={styles.text}>Sign in</Text></View></Link></Pressable>
  )
}

export default SignInOrOut;