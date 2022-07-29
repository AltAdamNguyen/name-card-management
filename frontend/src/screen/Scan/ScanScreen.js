import { Text, View, SafeAreaView, Image, useWindowDimensions, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Button, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { useIsFocused } from '@react-navigation/native';
import iconPath from '../../constants/iconPath';
import { parseCard } from '../../validate/ParseVcard';
import styles from './styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { t } from 'i18next';

const ScanScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [scanQr, setScanQr] = useState(false);
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card elevation={2} style={{ width: '80%', padding: 20 }}>
          <ActivityIndicator size="large" color="#1980FF" />
          <Text style={{ textAlign: 'center', fontSize: 16 }}>{t("Screen_Scan_Alert_Permission")}</Text>
        </Card>
      </View>
    )
  } else if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card elevation={2} style={{ width: '80%', padding: 20 }}>
          <Card.Content>
            <Title>{t("Screen_Scan_Alert_Erorr")}</Title>
            <Paragraph>{t("Screen_Scan_Alert_Erorr_Message_Camera")}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>{t("Screen_Scan_Alert_Button_Cancel")}</Button>
            <Button>{t("Screen_Scan_Alert_Button_Ok")}</Button>
          </Card.Actions>
        </Card>
      </View>
    )
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      navigation.navigate('AddContact', { pickPhoto: result });
    }
  };

  const handleScanQr = ({ data }) => {
    let card = parseCard(data)
    if (isEmpty(card)) {
      Alert.alert('Thông báo', 'Mã QR không hợp lệ', [{ text: 'Quét lại' }])
      setScanQr(true)
    } else {
      let contact = {
        name: card.n ? card.n : card.fn,
        job_title: card.title ? card.title : '',
        company: card.org ? card.org : '',
        phone: card.tel && card.tel.value ? card.tel.value.replace('+', '') : '',
        email: card.email && card.email.value ? card.email.value : '',
        fax: '',
        note: '',
        address: card.adr ? card.adr : '',
        website: card.url ? card.url : '',
        img_url: 'https://ncmsystem.azurewebsites.net/Images/noImage.jpg',
      }
      navigation.navigate('HomeSwap', { screen: 'UpdateContact', params: { contact: contact } });
      setScanQr(!scanQr)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <IconButton icon="close-circle" size={26} color="#fff" onPress={() => navigation.goBack()} />
          <IconButton
            icon={flashMode === FlashMode.on ? "flash" : "flash-off"}
            size={26}
            color="#fff"
            onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.on : FlashMode.off)}
          />
        </View>
      <View style={[styles.preview,{height: height}]}>
        {
          isFocused &&
          (scanQr ?
            <BarCodeScanner
              style={[styles.preview_camera, { height: height }]}
              onBarCodeScanned={handleScanQr}
            >
              <View style={styles.preview_overlay}>
                <Image style={styles.preview_iconOverlay} source={iconPath.icQr} />
              </View>
            </BarCodeScanner>
            :
            (<Camera
              style={[styles.preview_camera, { height: height }]}
              ref={cameraRef}
              ratio="4:3"
              flashMode={flashMode}
            >
              <View style={styles.preview_overlay}>
                <Image style={styles.preview_iconOverlay} source={iconPath.icOverlay} />
              </View>
            </Camera>))
        }
      </View>

      <View style={styles.footer}>
        <View style={styles.footer_content}>
          <IconButton
            icon='image'
            size={30}
            color='#FFF'
            onPress={pickImage}
            disabled={scanQr}
          />
          <IconButton size={80}
            icon='checkbox-blank-circle'
            color='#FFF'
            onPress={takePic}
            disabled={scanQr}
          />
          <IconButton
            icon={scanQr ?  'camera' : 'qrcode-scan'}
            size={30}
            color='#FFF'
            onPress={() => setScanQr(!scanQr)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ScanScreen;
