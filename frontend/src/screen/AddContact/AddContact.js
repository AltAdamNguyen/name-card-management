//import liraries
import React, { useState, useRef, useEffect } from "react";
import { View, Image,  ScrollView, Dimensions } from "react-native";
import { Provider, Button } from "react-native-paper";

import { StackActions } from "@react-navigation/native";
import styles from "./styles";
import { FetchApi } from "../../service/api/FetchAPI";
import { ContactAPI, Method, ContentType } from "../../constants/ListAPI";
import { Formik } from "formik";
import AddContactSchema from "../../validate/ValidateFormAddContact";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalContact from "../../components/addcontact/ModelContact";
import TextInputItem from "../../components/addcontact/TextInputItem";
// create a component

const formInput = [
  {
    name: "name",
    title: "Họ và tên",
    placeholder: "Nhập họ và tên",
    icon: 'account',
  },
  {
    name: "job_title",
    title: "Chức vụ",
    placeholder: "Nhập chức vụ",
    icon: "briefcase"
  },
  {
    name: "company",
    title: "Công ty",
    placeholder: "Nhập công ty",
    icon: "office-building"
  },
  {
    name: "phone",
    title: "Số điện thoại",
    placeholder: "Nhập số điện thoại",
    icon: "cellphone"
  },
  {
    name: "email",
    title: "Email",
    placeholder: "Nhập email",
    icon: "email"
  },
  {
    name: "fax",
    title: "Fax",
    placeholder: "Nhập fax",
    icon: "fax"
  },
  {
    name: "address",
    title: "Địa chỉ",
    placeholder: "Nhập địa chỉ",
    icon: "map-marker"
  },
  {
    name: "website",
    title: "Website",
    placeholder: "Nhập website",
    icon: "web"
  },
];
const contextDuplicate = {
  title: "Thông báo",
  message: "Liên hệ đã tồn tại bạn có muốn chỉnh sửa",
  cancel: "Không",
  submit: "Chỉnh sửa",
}
const AddContact = ({ contact, loading, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const formRef = useRef();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [value, setValue] = useState({
    name: "",
    job_title: "",
    company: "",
    phone: "",
    email: "",
    fax: "",
    address: "",
    website: "",
    img_url: "",
  });
  useEffect(() => {
    if (contact && formRef.current) {
      formRef.current.setValues({
        name: contact.data.name,
        job_title: contact.data.job_title,
        company: contact.data.company,
        phone: contact.data.phone,
        email: contact.data.email,
        fax: contact.data.fax,
        address: contact.data.address,
        website: contact.data.website,
        img_url: contact.data.img_url,
      });
    }
  }, [contact]);

  const [duplicate, setDuplicate] = useState(false);
  const [contactId, setContactId] = useState();

  const handelerModal = (item, name) => {
    if (formRef.current) {
      formRef.current.setValues({
        ...formRef.current.values,
        [name]: item,
      });
    }
  };

  const handleSubmit = (values) => {
    FetchApi(ContactAPI.AddContact, Method.POST, ContentType.JSON, values, getMessage);
  };

  const getMessage = (data) => {
    console.log(data);
    if (data.message === "D0001") {
      setDuplicate(true)
      setOnSubmit(false)
      setContactId(data.data.id)
    } else {
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("HomeScreen", {
        screen: "Home",
        params: { visibleModal: true },
      });
    }
  };

  const handleDuplicate = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("HomeSwap", {
      screen: "UpdateContact",
      params: { idContact: contactId },
    });
  }

  return (
    <Provider style={styles.container}>
      <ModalContact visible={duplicate} onPress={handleDuplicate} onPressVisable={() => setDuplicate(false)} context={contextDuplicate} />
      <View style={{ alignItems: "center" }}>
        <ShimmerPlaceholder visible={loading} width={windowWidth * 0.9} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10, }}>
          <View style={styles.imgContact}>
            {contact && formRef.current && formRef.current.values && <Image source={{ uri: formRef.current.values.img_url }} style={styles.image} />}
          </View>
        </ShimmerPlaceholder>
      </View>
      <Formik
        initialValues={value}
        onSubmit={handleSubmit}
        validationSchema={AddContactSchema}
        innerRef={formRef}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
          return (
            <View style={styles.formInput}>
              <ScrollView>
                {formInput.map((item, index) => {
                  return (
                    <View key={index} style={styles.formInput_component}>
                        {contact && <TextInputItem item={item} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} values={values} loading={loading} listItem={contact.data.Items} onPressRadio={handelerModal}/>}
                    </View>
                  );
                })}
                <View style={{marginBottom: 15}}/>
              </ScrollView>
              <View style={styles.footer}>
                <Button onPress={() => navigation.goBack()} style={styles.footer_button_label} color="#1890FF">Thoát</Button>
                <Button style={styles.footer_button_label} color="#1890FF" onPress={handleSubmit}>Lưu</Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </Provider>
  );
};

//make this component available to the app
export default AddContact;