//import liraries
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import { TextInput, Provider, IconButton, Button } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import styles from "./styles";
import { FetchApi } from "../../service/api/FetchAPI";
import { ContactAPI, Method, ContentType } from "../../constants/ListAPI";
import ModalAddContact from "../../components/addcontact/ModalAddContact";
import { Formik } from "formik";
import AddContactSchema from "../../validate/ValidateFormAddContact";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalContact from "../../components/addcontact/ModelContact";
// create a component

const formInput = [
  {
    name: "name",
    title: "Họ và tên (bắt buộc)",
    placeholder: "Nhập họ và tên",
  },
  {
    name: "job_title",
    title: "Chức vụ",
    placeholder: "Nhập chức vụ",
  },
  {
    name: "company",
    title: "Công ty",
    placeholder: "Nhập công ty",
  },
  {
    name: "phone",
    title: "Số điện thoại",
    placeholder: "Nhập số điện thoại",
  },
  {
    name: "email",
    title: "Email (bắt buộc)",
    placeholder: "Nhập email",
  },
  {
    name: "fax",
    title: "Fax",
    placeholder: "Nhập fax",
  },
  {
    name: "address",
    title: "Địa chỉ",
    placeholder: "Nhập địa chỉ",
  },
  {
    name: "website",
    title: "Website",
    placeholder: "Nhập website",
  },
];
const contextGoBack = {
  title: "Xác nhận",
  message: "Ban có chắc chắn muốn thoát không?",
  cancel: "Hủy",
  submit: "Đồng ý",
};
const contextOnSubmit = {
  title: "Thêm liên hệ",
  message: "Bạn có muốn lưu thay đổi không?",
  cancel: "Hủy",
  submit: "Lưu",
};
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

  const [modalVisible, setModalVisible] = useState({
    name: false,
    job_title: false,
    company: false,
    phone: false,
    email: false,
    fax: false,
    address: false,
    website: false,
  });

  const [goBack, setGoBack] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [contactId, setContactId] = useState();

  const handelerModal = (item, name) => {
    if (formRef.current) {
      formRef.current.setValues({
        ...formRef.current.values,
        [name]: item,
      });
    }

    setModalVisible({
      ...modalVisible,
      [name]: false,
    });
  };

  const handleVisable = (item) => {
    setModalVisible({
      ...modalVisible,
      [item]: false,
    });
  };

  const removeEmpty = (obj) => {
    return obj.length >= 3;
  };

  const handlePressAdd = () => {
    if (formRef.current) {
        if(formRef.current.isValid){
            formRef.current.handleSubmit();
        }else{
            setOnSubmit(false)
        }
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    FetchApi(
      ContactAPI.AddContact,
      Method.POST,
      ContentType.JSON,
      values,
      getMessage
    );
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
        <ModalContact visible={duplicate} onPress={handleDuplicate} onPressVisable={() => setDuplicate(false)} context={contextDuplicate}/>
      <ModalContact
        visible={onSubmit}
        context={contextOnSubmit}
        onPress={handlePressAdd}
        onPressVisable={() => setOnSubmit(false)}
      />
      <ModalContact
        visible={goBack}
        context={contextGoBack}
        onPress={() => navigation.goBack()}
        onPressVisable={() => setGoBack(false)}
      />
      <View style={styles.header}>
        <View style={styles.header_titleButton}>
          <IconButton
            icon="arrow-left"
            size={20}
            onPress={() => setGoBack(!goBack)}
          />
          <Text style={styles.header_titleButton_label}>Thêm liên hệ</Text>
        </View>

        <View style={styles.header_modal}>
          <Button color="#1890FF" onPress={() => setOnSubmit(!onSubmit)}>
            Thêm
          </Button>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <ShimmerPlaceholder
          visible={loading}
          width={windowWidth * 0.95}
          height={windowHeight * 0.3}
          shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}
        >
          <TouchableOpacity
            style={styles.imgContact}
            onPress={() => Keyboard.dismiss()}
          >
            {contact && (
              <Image
                source={{ uri: contact.data.img_url }}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        </ShimmerPlaceholder>
      </View>

      <ScrollView>
        <Formik
          initialValues={value}
          onSubmit={handleSubmit}
          validationSchema={AddContactSchema}
          innerRef={formRef}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => {
            return (
              <View style={styles.formInput}>
                {formInput.map((item, index) => {
                  return (
                    <View key={index}>
                      <View style={styles.formInput_item}>
                        <ShimmerPlaceholder
                          visible={loading}
                          style={{ width: "100%" }}
                          shimmerStyle={{
                            with: "100%",
                            height: 56,
                            borderRadius: 10,
                          }}
                        >
                          <TextInput
                            mode="outlined"
                            label={item.title}
                            placeholder={item.placeholder}
                            style={styles.formInput_item_input}
                            value={values[item.name]}
                            onChangeText={handleChange(item.name)}
                            onBlur={handleBlur(item.name)}
                            error={errors[item.name] && touched[item.name]}
                            right={
                              <TextInput.Icon
                                name="chevron-right"
                                onPress={() => {
                                  setModalVisible({
                                    ...modalVisible,
                                    [item.name]: true,
                                  });
                                }}
                                forceTextInputFocus={false}
                              />
                            }
                            theme={{
                              roundness: 10,
                              colors: { primary: "#1890FF", error: "#B22D1D" },
                            }}
                          />
                        </ShimmerPlaceholder>
                        {errors[item.name] && touched[item.name] ? (
                          <View style={styles.formInput_item_error}>
                            <Text style={styles.formInput_item_error_label}>
                              {errors[item.name]}
                            </Text>
                          </View>
                        ) : null}
                        <View>
                          {contact && (
                            <ModalAddContact
                              listItem={contact.data.Items.filter(removeEmpty)}
                              title={item.title}
                              visible={modalVisible}
                              name={item.name}
                              value={values[item.name]}
                              onPress={handelerModal}
                              onPressVisable={handleVisable}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </Provider>
  );
};

//make this component available to the app
export default AddContact;
