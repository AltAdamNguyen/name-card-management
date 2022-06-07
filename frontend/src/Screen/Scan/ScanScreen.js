//import liraries
import { Text, View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity , Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/native';

import icOverlay from '../..//asset/icon/overlay.png';
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
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    let originXImage = newPhoto.width * 0.05;
    let originYImage = newPhoto.height * 0.3;
    let heightImage = newPhoto.height*0.4;
    let widthImage = newPhoto.width*0.9;

    console.log(newPhoto.width);
    console.log(newPhoto.height);

    console.log(originXImage)
    console.log(originYImage)
    console.log(widthImage)
    console.log(heightImage);

    const manipResult = await manipulateAsync(
      newPhoto.uri,
      [{
        crop: {
          height: heightImage,
          width: widthImage,
          originX: originXImage,
          originY: originYImage,
        }
      }],
      { compress: 1, base64: true }
    );
    setPhoto(manipResult);
  };

  if (photo) {
    return (
      console.log(photo.base64),
      <SafeAreaView style={styles.container}>
          <Image style={{
            width: photo.width, height: photo.height,
          }} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.iconClose} source={icClose} />
        </TouchableOpacity>
      </View>
      <View style={styles.preview}>
        {
          isFocused &&
          <Camera style={{ height: height, width: "100%" }} ref={cameraRef} ratio="4:3" >
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
