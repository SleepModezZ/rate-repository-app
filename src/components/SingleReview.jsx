import Text from './Text';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../../theme.js';
import { Dimensions } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations.js';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  itemContainerA: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  flexItemA: {
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: 'column',
  },
  flexItemB: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    minHeight: 75,
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 43,
    width: 43,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 50,
  },
  coloredText: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  flexItemC: {
    marginTop: 5,
  },
  ratingText: {
    width: windowWidth * 0.8
  },
  itemContainerB: {
    flexGrow: 1,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  repositoryButton: {
    width: windowWidth * 0.43,
    alignItems: 'center',
    padding: 20,
    flexGrow: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  deleteButton: {
    width: windowWidth * 0.43,
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
    backgroundColor: theme.colors.warning,
    borderRadius: 5,
  },
  repositoryButtonText: {
    color: theme.colors.appBar,
    fontWeight: theme.fontWeights.bold,
  },
  itemContainerC: {
    flexDirection: 'row',
  },
});

const formatDate = (date) => {
  let arr = date.split('-');
  arr[2] = arr[2].split('T')[0];
  var result = arr.reverse().join();
  result = result.replace(/,/g, '.');
  return result;
};

const RepositoryOrReviewerName = ({ item }) => {
  if (item.repository) {
    return <Text style={styles.bold}>{item.repository.fullName}</Text>;
  } else if (item.user.username) {
    return <Text style={styles.bold}>{item.user.username}</Text>;
  }
  return <></>;
};

const GoToRepositoryOrDeleteReview = ({ item, refetch }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async () => {
    const deleteReviewId = item.id;
    await mutate({ variables: { deleteReviewId } });
    refetch();
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Delete review', "Are you sure you wan't to delete this review?", [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => deleteReview() },
    ]);

  if (item.repository) {
    return (
      <View style={styles.itemContainerB}>
        <Pressable onPress={() => navigate('/singleView/' + item.repository.id)}>
          <View style={styles.repositoryButton}>
            <Text style={styles.repositoryButtonText}>View repository</Text>
          </View>
        </Pressable>
        <Pressable onPress={createTwoButtonAlert}>
          <View style={styles.deleteButton}>
            <Text style={styles.repositoryButtonText}>Delete review</Text>
          </View>
        </Pressable>
      </View>
    );
  }
  return <></>;
};

const SingleReview = ({ item, refetch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainerA}>
        <View style={styles.flexItemA}>
          <View style={styles.ratingContainer}>
            <Text style={styles.coloredText}>{item.rating}</Text>
          </View>
        </View>
        <View styles={styles.flexItemB}>
          <RepositoryOrReviewerName item={item} />
          <Text>{formatDate(item.createdAt)}</Text>
          <View style={styles.flexItemC}>
            <Text style={styles.ratingText}>{item.text}</Text>
          </View>
        </View>
      </View>
      <View>
        <GoToRepositoryOrDeleteReview item={item} refetch={refetch} />
      </View>
    </View>
  );
};

export default SingleReview;
