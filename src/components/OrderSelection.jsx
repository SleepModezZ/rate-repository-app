import { useEffect, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Menu, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginTop: '45%',
    marginLeft: '15%',
    marginRight: '15%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

const ShowSelection = ({ searchKeyword, setSearchKeyword }) => {
  const [value, setValue] = useState(searchKeyword);
  const [bouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    setSearchKeyword(bouncedValue);
  });

  const onChangeSearch = (input) => {
    setValue(input);
  };

  return (
    <View>
      <Searchbar
        autoFocus={true}
        style={styles.searchContainer}
        placeholder="Search"
        onChangeText={onChangeSearch}
        // onIconPress={()=> {search()}}
        value={value}
      />
    </View>
  );
};

const OrderSelection = ({
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  searchKeyword,
  setSearchKeyword,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const latest = () => {
    setOrderBy('CREATED_AT');
    setOrderDirection('DESC');
    setShowMenu(false);
  };
  const highest = () => {
    setOrderBy('RATING_AVERAGE');
    setOrderDirection('DESC');
    setShowMenu(false);
  };
  const lowest = () => {
    setOrderBy('RATING_AVERAGE');
    setOrderDirection('ASC');
    setShowMenu(false);
  };

  let text = 'Latest repositories';

  if (orderBy == 'RATING_AVERAGE') {
    if (orderDirection == 'DESC') {
      text = 'Highest rated repositories';
    } else {
      text = 'Lowest rated repositories';
    }
  }

  const OrderingMenu = () => {
    if (showMenu) {
      return (
        <View>
          <Menu.Item
            leadingIcon="menu-down"
            onPress={() => setShowMenu(true)}
            title={text}
          />
          <Modal transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Menu.Item disabled title="Select an item..." />
                <Menu.Item onPress={latest} title="Latest repositories" />
                <Menu.Item onPress={highest} title="Highest rated repositories" />
                <Menu.Item onPress={lowest} title="Lowest rated repositories" />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    return (
      <>
        <Menu.Item leadingIcon="menu-down" onPress={() => setShowMenu(true)} title={text} />
      </>
    );
  };

  return (
    <View>
      <ShowSelection
        key="editor1"
        orderBy={orderBy}
        orderDirection={orderDirection}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <OrderingMenu />
    </View>
  );
};

export default OrderSelection;
