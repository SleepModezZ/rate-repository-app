import useReviews from '../hooks/useReviews';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';
import SingleReview from './SingleReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, refetch, loading, error } = useReviews();

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  const reviewNodes = data.me.reviews ? data.me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <SingleReview item={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
