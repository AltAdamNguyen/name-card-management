import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { View } from 'react-native';

const CustomCheckedBox = ({ onClick, id, isChecked}) => {
  const [checked, setChecked] = React.useState(isChecked)
   
  return (
    <View>
      <Checkbox
        uncheckedColor='black'
        color='#1890FF'
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          // setChecked(!checked)
          onClick(id, !isChecked)
        }}
      />
    </View>
  )
};

export default CustomCheckedBox;