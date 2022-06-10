import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Logo from '../../asset/image/FIS_logo.png';
const CustemHeaders = ({text_PRIMARY, text_TERTIARY, text_title}) => {
  const {height} = useWindowDimensions();
  return (
    <View style={styles.root}>
      <View style={styles.headline}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.1}]}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.text_PRIMARY}>{text_PRIMARY}</Text>
          <Text style={styles.text_TERTIARY}>{text_TERTIARY}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text_title}>{text_title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '90%',
    marginBottom: 15
  },
  headline: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    width: '30%',
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20
    
  },
  text_PRIMARY: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000000'
  },
  text_TERTIARY: {
    fontSize: 13,
    color: '#000000'
  },
  text_title: {
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 10,
    color: '#333333'
  }
});

export default CustemHeaders;
