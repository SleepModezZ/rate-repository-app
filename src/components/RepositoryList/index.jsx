import { FlatList, View, StyleSheet} from 'react-native';
import Item from './ListItem'
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Text from '../Text' 

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>

  const repositoryNodes = data.repositories
  ? data.repositories.edges.map(edge => edge.node)
  : [];


  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        // other props
      />
  );
};

export default RepositoryList;