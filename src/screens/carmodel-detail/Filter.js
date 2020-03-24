import React, { useState, useEffect } from 'react';
import { View, CheckBox, Text, StyleSheet } from 'react-native';
import { ModalContainer, Button } from 'Components';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  visible: Boolean,
  onSubmit: () => void,
  onCancel: () => void,
  filterProps: {},
};

const Filter = ({ visible, onSubmit, onCancel, filterProps }: PropTypes) => {
  const [filter, setFilter] = useState({
    all: false,
    hub: false,
    other: false,
    customer: false,
  });

  useEffect(() => {
    setFilter({ ...filterProps });
  }, []);
  return (
    <ModalContainer modalVisible={visible} onClose={onCancel}>
      <View style={styles.modal}>
        <Text
          style={[
            textStyle.widgetItem,
            { textAlign: 'center', marginBottom: 16 },
          ]}
        >
          Filter
        </Text>
        <View style={styles.item}>
          <Text style={textStyle.bodyText}>All</Text>
          <CheckBox
            value={filter.all}
            onValueChange={value =>
              setFilter({
                all: value,
                hub: value,
                other: value,
                customer: value,
              })
            }
          />
        </View>

        <View style={styles.item}>
          <Text style={textStyle.bodyText}>Hub car</Text>
          <CheckBox
            value={filter.hub}
            onValueChange={value =>
              setFilter(filter => ({
                ...filter,
                all: false,
                hub: value,
              }))
            }
          />
        </View>

        <View style={styles.item}>
          <Text style={textStyle.bodyText}>Other hub car</Text>
          <CheckBox
            value={filter.other}
            onValueChange={value =>
              setFilter(filter => ({
                ...filter,
                all: false,
                other: value,
              }))
            }
          />
        </View>

        <View style={styles.item}>
          <Text>Customer car</Text>
          <CheckBox
            value={filter.customer}
            onValueChange={value =>
              setFilter(filter => ({
                ...filter,
                all: false,
                customer: value,
              }))
            }
          />
        </View>
        <Button
          label="Done"
          style={{ marginTop: 8 }}
          onPress={() => onSubmit(filter)}
        />
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    width: '90%',
    padding: 16,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Filter;
