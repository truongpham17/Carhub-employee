import React, { useState } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { addBook } from '@redux/actions/book';
import { connect } from 'react-redux';

type PropTypes = {
  addBook: ({ title: String, description: String }) => void,
  navigation: {},
};

const AddBookScreen = ({ addBook, navigation }: PropTypes) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeTitle = title => {
    setTitle(title);
  };

  const handleChangeDescription = description => {
    setDescription(description);
  };

  const handleAddNew = () => {
    addBook(
      { title, description },
      { onSuccess: () => navigation.pop(), onFailure: () => {} }
    );
  };

  return (
    <SafeAreaView>
      <TextInput
        value={title}
        onChangeText={handleChangeTitle}
        placeholder="Nhập title"
      />
      <TextInput
        value={description}
        onChangeText={handleChangeDescription}
        placeholder="Nhập description"
      />
      <Button title="Add" onPress={handleAddNew} />
    </SafeAreaView>
  );
};

export default connect(state => ({}), { addBook })(AddBookScreen);
