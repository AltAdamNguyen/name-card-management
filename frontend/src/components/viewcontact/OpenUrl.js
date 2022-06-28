import React, { useCallback } from "react";
import { Alert, Linking,Text } from "react-native";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(`https://${url}`);
    if (supported) {
      await Linking.openURL(`https://${url}`);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Text style={{ alignItems: 'flex-start', color:"#2D9CDB", fontSize: 16 }}  onPress={handlePress} >{children}</Text>;
};

export default OpenURLButton;