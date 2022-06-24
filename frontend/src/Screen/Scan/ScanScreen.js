//import liraries
import { Text, View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import iconPath from '../../constants/iconPath';

import styles from './styles';

// create a component
const ScanScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  const takePic = async () => {
    let options = {
      quality: 0.5,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    navigation.navigate('AddContact', { newPhoto: newPhoto });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if(!result.cancelled){
      navigation.navigate('AddContact', { pickPhoto: result});
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_content}>
          <TouchableOpacity style={styles.header_content_buttonClose} onPress={() => navigation.goBack()}>
            <Image style={styles.header_content_buttonClose_iconClose} source={iconPath.icClose} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.header_content_buttonClose} onPress={() => navigation.goBack()}>
            <Image style={styles.header_content_buttonClose_iconClose} source={iconPath.icClose} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.preview}>
        {
          isFocused &&
          <Camera style={{ height: height, width: "100%", backgroundColor: "#ffff", justifyContent: 'center', alignItems: 'center' }} ref={cameraRef} ratio="4:3" flashMode={FlashMode.on}>
            <View style={styles.preview_suggest}>
              <Text>Đặt thẻ vào đúng khung hình</Text>
            </View>
            <View style={styles.preview_overlay}>
              <Image style={styles.preview_iconOverlay} source={iconPath.icOverlay} />
            </View>
          </Camera>
        }
      </View>

      <View style={styles.footer}>
        <View style={styles.footer_content}>
          <IconButton
            icon='image'
            size={50}
            color='#BDBDBD'
            onPress={pickImage}
          />
          <TouchableOpacity style={styles.footer_buttonScan} onPress={takePic}>
            <Image style={styles.footer_buttonScan_iconScan} source={iconPath.icCamera} />
          </TouchableOpacity>
          <IconButton
            icon='image'
            size={50}
          />
        </View>
      </View>
    </SafeAreaView>

  );
};


//make this component available to the app
export default ScanScreen;
