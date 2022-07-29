import { useTranslation } from "react-i18next";

export const FormInput = () => {
    const { t, i18n } = useTranslation();
    const formInput = [
        {
            name: 'name',
            title: t("Screen_UpdateContact_Input_Title_FullName"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_FullName"),
            icon: 'account',
        },
        {
            name: 'job_title',
            title: t("Screen_UpdateContact_Input_Title_JobTitle"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_JobTitle"),
            icon: "briefcase"
        },
        {
            name: 'company',
            title: t("Screen_UpdateContact_Input_Title_Company"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Company"),
            icon: "office-building"
        },
        {
            name: 'phone',
            title: t("Screen_UpdateContact_Input_Title_PhoneNumber"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_PhoneNumber"),
            icon: "cellphone"
        },
        {
            name: 'email',
            title: t("Screen_UpdateContact_Input_Title_Email"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Email"),
            icon: "email"
        },
        {
            name: 'fax',
            title: t("Screen_UpdateContact_Input_Title_Fax"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Fax"),
            icon: "fax"
        },
        {
            name: 'address',
            title: t("Screen_UpdateContact_Input_Title_Address"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Address"),
            icon: "map-marker"
        },
        {
            name: 'note',
            title: t("Screen_UpdateContact_Input_Title_Note"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Note"),
            icon: "text-box"
        },
        {
            name: 'website',
            title: t("Screen_UpdateContact_Input_Title_Website"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Website"),
            icon: "web"
        }
    ]
    return formInput;
}