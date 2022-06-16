//import liraries
import { Text, View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, FlashMode} from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { FetchAPI } from '../../api/FetchAPI';
import icOverlay from '../..//asset/icon/overlay.png';
import icCamera from '../../asset/icon/camera.png';
import icClose from '../../asset/icon/close.png';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.iconClose} source={icClose} />
        </TouchableOpacity>
      </View>
      <View style={styles.preview}>
        {
          isFocused &&
            <Camera style={{ height: height, width: "100%" }} ref={cameraRef} ratio="4:3" flashMode={FlashMode.on}>
              <View style={styles.overlay}>
                <View style={styles.suggest}>
                  <Text>Đặt thẻ vào đúng khung hình</Text>
                </View>
                <Image style={styles.iconOverlay} source={icOverlay} />
              </View>
            </Camera>
        }
      </View>

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
