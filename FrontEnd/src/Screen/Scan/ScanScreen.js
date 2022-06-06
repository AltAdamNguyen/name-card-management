//import liraries
import { Text, View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/native';

import icCamera from '../../asset/icon/camera.png';
import icClose from '../../asset/icon/close.png';

import styles from './styles';

// create a component
const ScanScreen = () => {
  const isFocused = useIsFocused();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

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
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    const manipResult = await manipulateAsync(
      newPhoto.uri,
      [{
        crop: {
          height: width,
          width: width,
          originX: 0,
          originY: (height - width) / 2
        }
      }],
      { compress: 1, base64: true }
    );
    setPhoto(manipResult);
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={{
          width: width, height: width,
        }} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.headerContainer}>
        <Image style={styles.iconClose} source={icClose} />
      </TouchableOpacity>
      {
        isFocused &&
        <Camera style={{ height: height, width: "100%", }} ref={cameraRef} ratio="16:9" >
            
        </Camera>
      }
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.containerScan} onPress={takePic}>
          <Image style={styles.iconScan} source={icCamera} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};


//make this component available to the app
export default ScanScreen;
