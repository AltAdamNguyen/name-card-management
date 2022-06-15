import { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { manipulateAsync } from 'expo-image-manipulator';
import { AddContact } from "../../screen";

const SkeletonAddContact = ({route, navigation}) => {
    const [contact, setContact] = useState();
    const crop = async () => {
        const image = route.params.newPhoto

        let originXImage = image.width * 0.05;
        let originYImage = image.height * 0.3;
        let heightImage = image.height * 0.4;
        let widthImage = image.width * 0.9;

        const manipResult = await manipulateAsync(
            image.uri,
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
        return manipResult
    }
    useEffect(() => {
        crop()
            .then((e) => {

                fetch('https://ncmsystem.azurewebsites.net/api/scan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: "data:image/jpg;base64," + e.base64 })
                }).then(response => response.json())
                    .then(data => { getData(data) })
                    .catch(error => console.log(error));
            })
            .catch()
    }, [])

    const getData = (data) => {
        setContact(data.data)
    }

    console.log(contact)
    return(
        <SafeAreaView style={{flex: 1}}>
            {contact ? <AddContact contact={contact} navigation={navigation} /> : <ActivityIndicator size="large" color="#0000ff" />}
        </SafeAreaView>
    )
}

export default SkeletonAddContact