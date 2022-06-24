import { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { manipulateAsync } from 'expo-image-manipulator';
import { AddContact } from "../../../screen";
import { FetchApi } from "../../../service/api/FetchAPI";
import { Method, ContentType, ContactAPI } from "../../../constants/ListAPI";

const SkeletonAddContact = ({route, navigation}) => {
    const [contact, setContact] = useState();
    const [visible, setVisible] = useState(false);
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
        if(route.params.newPhoto) {
            crop()
            .then((e) => {
                FetchApi(ContactAPI.Scan, 
                    Method.POST, 
                    ContentType.JSON,
                    { image: "data:image/jpg;base64," + e.base64 },
                    getData)
            })
            .catch()
        }
        if(route.params.pickPhoto) {
            FetchApi(ContactAPI.Scan, 
                Method.POST, 
                ContentType.JSON,
                { image: "data:image/jpg;base64," + route.params.pickPhoto.base64 },
                getData)
        }
        
    }, [])

    const getData = (data) => {
        setContact(data.data)
        setVisible(true)
    }

    console.log(contact)
    return(
        <SafeAreaView style={{flex: 1}}>
            <AddContact contact={contact} loading={visible} navigation={navigation} />
        </SafeAreaView>
    )
}

export default SkeletonAddContact