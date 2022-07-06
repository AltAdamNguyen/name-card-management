//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, UIManager } from 'react-native';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import styles from '../../screen/AddContact/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, RadioButton, Card } from "react-native-paper";
// create a component
const TextInputItem = ({ item, handleChange, handleBlur, errors, touched, values, loading, listItem, onPressRadio }) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState();

    useEffect(() => {
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [])

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    const handleChangeValue = (value) => {
        setValue(value);
        onPressRadio(value, item.name);
    }

    return (
        <View style={styles.formInput_item}>
            <ShimmerPlaceholder
                visible={loading}
                style={{ width: "100%" }}
                shimmerStyle={styles.shimmer_formInput}
            >
                <View style={styles.formInput_item_component}>
                    <Icon size={20} name={item.icon} color="#1890FF" />
                    <View style={{ width: '100%', marginLeft: 10 }}>
                        <Text style={{ fontWeight: '600', color: '#1890FF' }}>{item.title}</Text>
                        <TextInput
                            placeholder={item.placeholder}
                            value={values[item.name]}
                            multiline={true}
                            dense={true}
                            style={styles.formInput_item_input}
                            onChangeText={handleChange(item.name)}
                            onBlur={handleBlur(item.name)}
                            error={errors[item.name] && touched[item.name]}
                            theme={{
                                colors: {
                                    primary: '#1890FF',
                                    error: '#B22D1D',
                                },
                            }}
                            right={
                                <TextInput.Icon
                                    name={expanded ? "chevron-up" : "chevron-down"}
                                    onPress={toggleExpand}
                                    forceTextInputFocus={false}
                                />
                            }
                        />
                        {
                            expanded &&
                            <Card mode='outlined' style={{width: '90%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                <RadioButton.Group onValueChange={(value) => handleChangeValue(value)} value={value}>
                                    {listItem.map((item, index) => {
                                        return (
                                            <RadioButton.Item label={item} value={item} key={index} color="#1890FF"/>
                                        )
                                    })}
                                </RadioButton.Group>
                            </Card>
                        }
                    </View>
                </View>
            </ShimmerPlaceholder>
            {errors[item.name] && touched[item.name] ? (
                <View style={styles.formInput_item_error}>
                    <Text style={styles.formInput_item_error_label}>
                        {errors[item.name]}
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

//make this component available to the app
export default TextInputItem;
