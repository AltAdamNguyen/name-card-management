import { useTranslation } from "react-i18next";

export const ListFlag = () => {
    const {t, i18n} = useTranslation();
    const listFlag = {
        F0001: {
            name: 'very-important',
            title: t("Screen_Home_Button_Flag_VeryImportant"),
            color: '#EB5757',
            background: 'rgba(235, 87, 87, 0.2)',
            value: 'F0001',
        },
        F0002: {
            name: 'important',
            title: t("Screen_Home_Button_Flag_Important"),
            color: '#F2994A',
            background: 'rgba(242, 153, 74, 0.2)',
            value: 'F0002',
        },
        F0003: {
            name: 'not-important',
            title: t("Screen_Home_Button_Flag_NotImportant"),
            color: '#FFCD01',
            background: '#FFCD0120',
            value: 'F0003',
        },
        F0004: {
            name: 'dont-care',
            title: t("Screen_Home_Button_Flag_DoNotCare"),
            color: '#2D9CDB',
            background: 'rgba(45, 156, 219, 0.2)',
            value: 'F0004',
        }
    }
    return listFlag
};

