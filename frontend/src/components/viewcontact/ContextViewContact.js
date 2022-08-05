import { useTranslation } from "react-i18next";

export const ListFlag = () => {
    const {t, i18n} = useTranslation();
    const listFlag = {
        F0001: {
            name: 'very-important',
            title: t("Screen_ViewContact_Button_Flag_VeryImportant"),
            color: '#EB5757',
            background: 'rgba(235, 87, 87, 0.2)',
            value: 'F0001',
        },
        F0002: {
            name: 'important',
            title: t("Screen_ViewContact_Button_Flag_Important"),
            color: '#F2994A',
            background: 'rgba(242, 153, 74, 0.2)',
            value: 'F0002',
        },
        F0003: {
            name: 'not-important',
            title: t("Screen_ViewContact_Button_Flag_NotImportant"),
            color: '#F2C94C',
            background: 'rgba(242, 201, 76, 0.2)',
            value: 'F0003',
        },
        F0004: {
            name: 'dont-care',
            title: t("Screen_ViewContact_Button_Flag_DoNotCare"),
            color: '#2D9CDB',
            background: 'rgba(45, 156, 219, 0.2)',
            value: 'F0004',
        },
        none: {
            name: 'none',
            title: t("Screen_ViewContact_Button_Flag_DeleteSelection"),
            color: '#000000',
            background: 'transparent',
            value: 'null',
        }
    }
    return listFlag
};

export const ListStatus = () => {
    const {t, i18n} = useTranslation();
    const listStatus = {
        S0001: {
            name: 'failed',
            color: '#EB5757',
            title: t("Screen_ViewContact_Button_Status_Failed"),
            icon: 'close-circle',
            value: 'S0001',
        },
        S0002: {
            name: 'ongoing',
            color: '#F2994A',
            title: t("Screen_ViewContact_Button_Status_OnGoing"),
            icon: 'clock',
            value: 'S0002',
        },
        S0003: {
            name: 'success',
            color: '#00C853',
            title: t("Screen_ViewContact_Button_Status_Completed"),
            icon: 'check-circle',
            value: 'S0003',
        }
    }
    return listStatus
}