import React, { useCallback } from "react";
import { Alert, Linking } from "react-native";
import { Button } from 'react-native-paper';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(`https://${url}`);
    if (supported) {
      await Linking.openURL(`https://${url}`);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button style={{ alignItems: 'flex-start', width: '100%' }} color="#2D9CDB" onPress={handlePress} >{children}</Button>;
};

export default OpenURLButton;