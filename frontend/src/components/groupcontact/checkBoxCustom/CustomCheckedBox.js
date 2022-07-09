import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { View } from 'react-native';

const CustomCheckedBox = ({ onClick, id, isChecked }) => {
  const [checked, setChecked] = React.useState(isChecked)

  return (
    <View>
      <Checkbox
        uncheckedColor='black'
        color='#1890FF'
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked)
          onClick(id, !checked)
        }}
      />
    </View>
  )
};

export default CustomCheckedBox;