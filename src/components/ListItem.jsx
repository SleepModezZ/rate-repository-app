import { View, StyleSheet, Image } from 'react-native';
import Text from './Text'
import theme from '../../theme.js';

const styles = StyleSheet.create({

  itemContainer: {
    backgroundColor: 'white'
  },
  flexItemA: {
    padding: 10,
    flexDirection: 'row',
  },
  flexItemB: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    minHeight: 75
  },
  flexItemC: {
    padding: 15,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    flexDirection: 'row',
  },
  flexItemD: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  flexItemE: {
    flexGrow: 2,
  },
  
  reverseColor: {
    color: theme.colors.appBar
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 5
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 10
  },
  leftPadding: {
    paddingLeft: 30,
    flexDirection: 'column',
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  }

});

const format = (num) => {
  if (num >= 1000) {
    return "" + (num / 1000).toFixed(1) + "k"
  }
  return "" +  num
}

const ListItem = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.flexItemA}>
      <Image style={styles.logo} source={{uri: item.ownerAvatarUrl}} />
      <View style={styles.leftPadding}>
        <Text style={styles.title}> {item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.box}>
          <View style={styles.flexItemD}>
            <Text style={styles.reverseColor}>{item.language}</Text>
          </View>
          <View style={styles.flexItemE}>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.flexItemB}>
      <View style={styles.flexItemC}>
        <Text style={styles.bold}>{format(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.flexItemC}>
        <Text style={styles.bold}>{format(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.flexItemC}>
        <Text style={styles.bold}>{format(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.flexItemC}>
        <Text style={styles.bold}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default ListItem;