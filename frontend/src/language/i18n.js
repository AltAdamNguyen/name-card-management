import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from './english.json'
import vietnamese from './vietnamese.json'
//empty for now
const resources = {};

i18next.use(initReactI18next).init({
    lng: 'vn',
    resources: {
        vn: vietnamese,
        en: english
    },
    react:{
        useSuspense: false
    }
})

export default i18next;