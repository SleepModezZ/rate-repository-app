import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations.js'
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const res = await mutate({
      variables: { username, password },
    })
    if (res) {
      await authStorage.setAccessToken(res.data.authenticate.accessToken);
      client.resetStore();
    }
    return res;
  };
  
  return [signIn, result];
};

export default useSignIn;