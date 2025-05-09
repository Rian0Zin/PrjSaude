import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const data = [
  { label: 'Após o almoço', value: '1', icon: 'weather-sunny' },
  { label: 'Após a janta', value: '2', icon: 'weather-night' },
];

const MultiSelectComponent = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
      <MaterialCommunityIcons
        style={styles.icon}
        color="green"
        name={item.icon}
        size={20}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Horários Pré-Definidos"
        value={selectedItems.map(item => item.value)}
        search
        searchPlaceholder="Search..."
        onChange={items => {
          const selectedFullItems = data.filter(d =>
            items.includes(d.value)
          );
          setSelectedItems(selectedFullItems);
        }}
        renderLeftIcon={() => {
          const iconName =
            selectedItems.length > 0
              ? selectedItems[0].icon
              : 'clock-time-nine-outline';
          return (
            <MaterialCommunityIcons
              style={styles.icon}
              color={"green"}
              name={iconName}
              size={20}
            />
          );
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <MaterialCommunityIcons
                style={styles.icon}
                color={"green"}
                name={item.icon}
                size={20}
              />
              <AntDesign color={"green"} name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { width: '100%' },
  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    elevation: 2,
    paddingHorizontal: 7,
    paddingVertical: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    fontSize: 0,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
