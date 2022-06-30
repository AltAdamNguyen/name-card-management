//import liraries
import React , {useContext} from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../../screen/ViewContact/styles';
import AuthContext from '../../../store/AuthContext';
import i18next from '../../../language/i18n';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
// create a component
const BottomSheetContact = ({visible,onPressUpdate,onPressVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onPressVisible}>
                <TouchableWithoutFeedback >
                    <View style={styles.modelViewFloat}>
                        <View>
                            <Button icon="account-multiple-plus-outline" color='#000000' labelStyle={{ fontSize: 25 }} style={{ alignItems: 'flex-start', width: '100%' }}>
                            <Text style={{ fontSize: 14 }}>{t("Screen_ViewContact_BottomSheet_Text_AddToGroup")}</Text>
                            </Button>
                               
                            <Button
                                icon="account-edit-outline"
                                color='#000000'
                                labelStyle={{ fontSize: 25 }}
                                style={{ alignItems: 'flex-start' }}
                                onPress={onPressUpdate}
                            >
                                <Text style={{ fontSize: 14 }}>{t("Screen_ViewContact_BottomSheet_Text_UpdateInformation")}</Text>
                            </Button>
                            <Button icon="account-minus-outline" color='#000000' labelStyle={{ fontSize: 25 }} style={{ alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14 }}>{t("Screen_ViewContact_BottomSheet_Text_DeactivateNameCard")}</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};


//make this component available to the app
export default BottomSheetContact;
