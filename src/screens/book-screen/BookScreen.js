import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getBooks } from '@redux/actions/book';
import BookItem from './BookItem';

type BookType = {
  title: String,
  description: String,
};

type PropTypes = {
  books: [BookType],
  getBooks: () => void,
  navigation: {},
};

const BookScreen = ({ books, getBooks, navigation }: PropTypes) => {
  useEffect(() => {
    getBooks();
  }, []);

  const handleAddNew = () => {
    navigation.navigate('AddBookScreen');
  };

  const getKeyExtractor = (item, index) => index;
  const renderBookItem = ({ item, index }) => <BookItem {...item} />;
  return (
    <View>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={getKeyExtractor}
      />
      <Button title="Add new" onPress={handleAddNew} />
    </View>
  );
};

export default connect(
  state => ({
    books: state.book.books,
  }),
  { getBooks }
)(BookScreen);
