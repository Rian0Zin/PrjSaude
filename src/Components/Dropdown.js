import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'MG', value: 'MG' },
  { label: 'ML', value: 'ML' },
  { label: 'G', value: 'G' },
];

const DropdownComponent = ({ onSelect, selectedValue }) => {  // Adicione selectedValue nas props
  const [value, setValue] = useState(selectedValue || null);  // Use o selectedValue como valor inicial

  // Atualize o estado interno quando o selectedValue mudar
  React.useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="G/MG"
      searchPlaceholder="Search..."
      value={value}  // Use o estado value que agora sincroniza com selectedValue
      onChange={item => {
        setValue(item.value);
        onSelect(item.value);
      }}
      renderItem={renderItem}
    />
  );
};


export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width:'30%',
    paddingVertical:10,
    elevation: 2,
    padding:5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    width:0,
    opacity:0
  },
});