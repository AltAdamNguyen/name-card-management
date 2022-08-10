import { Text, View, SafeAreaView, Image, useWindowDimensions, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Button, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import iconPath from '../../constants/iconPath';
import styles from './styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { t } from 'i18next';
import vCard from 'vcf';

const ScanScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [scanQr, setScanQr] = useState(false);
  const [stopScan, setStopScan] = useState(false);
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
      quality: 0.8,
      base64: true,
    });
    if (!result.cancelled) {
      navigation.navigate('AddContact', { pickPhoto: result });
    }
  };

  const handleScanQr = (data) => {
    try {
      var card = vCard().parse(data.replace(/\r?\n/g, "\r\n"))
      let contact = {
        name: card.data.fn ? card.data.fn._data : card.data.n ? card.data.n._data : '',
        job_title: card.data.title ? card.data.title._data : '',
        company: card.data.org ? card.data.org._data : '',
        phone: card.data.tel ? card.data.tel.length ? card.data.tel[0]._data.replace(/[^\d]/g,'') : card.data.tel._data.replace(/[^\d]/g,'') : '',
        email: card.data.email ? card.data.email.length ? card.data.email[0]._data : card.data.email._data : '',
        fax: '',
        note: '',
        address: card.data.adr ? card.data.adr.length ? card.data.adr[0]._data : card.data.adr._data : '',
        website: card.data.url ? card.data.url.length ? card.data.url[0]._data : card.data.url._data : '',
        img_url: 'https://ncmsystem.azurewebsites.net/Images/noImage.jpg',
      }
      navigation.navigate('HomeSwap', { screen: 'UpdateContact', params: { contact: contact } });
      setScanQr(!scanQr)
    }
    catch (err) {
      setStopScan(true)
      Alert.alert(
        t("Screeen_Scan_Alert_QR_Error_Title"),
        t("Screeen_Scan_Alert_QR_Error_Message"),
        [{
          text: t("Screeen_Scan_Alert_QR_Error_Button_Ok"),
          onPress: () => { setStopScan(false) }
        }])      
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
      <View style={[styles.preview, { height: height }]}>
        {
          isFocused &&
          (scanQr ?
            <BarCodeScanner
              style={[styles.preview_camera, { height: height }]}
              onBarCodeScanned={({ data }) => { stopScan ? null : handleScanQr(data) }}
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
            icon={scanQr ? 'camera' : 'qrcode-scan'}
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
