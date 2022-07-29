import { useTranslation } from "react-i18next";


export const FormInput = () => {
  const {t, i18n} = useTranslation();
    const formInput = [
        {
          name: "name",
          title: t("Screen_AddContact_FormInput_Label_Name"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Name"),
          icon: 'account',
        },
        {
          name: "job_title",
          title: t("Screen_AddContact_FormInput_Label_JobTitle"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_JobTitle"),
          icon: "briefcase"
        },
        {
          name: "company",
          title: t("Screen_AddContact_FormInput_Label_Company"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Company"),
          icon: "office-building"
        },
        {
          name: "phone",
          title: t("Screen_AddContact_FormInput_Label_Phone"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Phone"),
          icon: "cellphone"
        },
        {
          name: "email",
          title: t("Screen_AddContact_FormInput_Label_Email"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Email"),
          icon: "email"
        },
        {
          name: "fax",
          title: t("Screen_AddContact_FormInput_Label_Fax"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Fax"),
          icon: "fax"
        },
        {
          name: "address",
          title: t("Screen_AddContact_FormInput_Label_Address"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Address"),
          icon: "map-marker"
        },
        {
          name: 'note',
          title: t("Screen_AddContact_FormInput_Label_Note"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Note"),
          icon: "text-box"
        },
        {
          name: "website",
          title: t("Screen_AddContact_FormInput_Label_Website"),
          placeholder: t("Screen_AddContact_FormInput_Placeholder_Website"),
          icon: "web"
        },
      ];
    return formInput;
};

export const DuplicateModel = () => {
  const {t, i18n} = useTranslation();
    const duplicateModel = {
      title: t("Screen_AddContact_Modal_Duplicate_Title"),
      message: t("Screen_AddContact_Modal_Duplicate_Message"),
      cancel: t("Screen_AddContact_Modal_Duplicate_Cancel"),
      submit: t("Screen_AddContact_Modal_Duplicate_Submit"),
    }
    return duplicateModel;
}

export const DuplicateInfoModel = (owner) => {
  const {t, i18n} = useTranslation();
    const duplicateInfoModel = {
      title: t("Screen_AddContact_Modal_DuplicateInfo_Title"),
      message: t("Screen_AddContact_Modal_DuplicateInfo_Message", {owner: owner}),
      cancel: t("Screen_AddContact_Modal_DuplicateInfo_Cancel"),
      submit: t("Screen_AddContact_Modal_DuplicateInfo_Submit"),
    }
    return duplicateInfoModel;
}