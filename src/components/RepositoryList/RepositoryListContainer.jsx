import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import Item from './ListItem';
import React from 'react';
import OrderSelection from '../OrderSelection';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ChooseSingle = ({ item }) => {
  const navigate = useNavigate();
  return (
    <View>
      <Pressable onPress={() => navigate('/singleView/' + item.id)}>
        <Item item={item} />
      </Pressable>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <OrderSelection
        key="öglkjdfs"
        orderBy={this.props.orderBy}
        setOrderBy={this.props.setOrderBy}
        orderDirection={this.props.orderDirection}
        setOrderDirection={this.props.setOrderDirection}
        searchKeyword={this.props.searchKeyword}
        setSearchKeyword={this.props.setSearchKeyword}
        // ...
      />
    );
  };

  render() {
    //
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ChooseSingle item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

export default RepositoryListContainer;
