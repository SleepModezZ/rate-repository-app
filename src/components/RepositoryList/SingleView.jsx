import { FlatList, View, StyleSheet } from 'react-native';
import ListItem from './ListItem';
import { useQuery } from '@apollo/client';
import Text from '../Text';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../../graphql/queries';
import SingleReview from '../SingleReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleView = () => {
  const repositoryID = useParams().id;
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryID },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <SingleReview item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View>
          <ListItem item={data.repository} showGitHubButton={true} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleView;
