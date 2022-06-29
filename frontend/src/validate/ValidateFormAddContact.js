import * as Yup from 'yup';

const phoneRegex = /^((0[3|4|5|7|8|9])+([0-9]{8})|(84[3|4|5|7|8|9])+([0-9]{8}))$/;

const websiteRegex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/

const emailRegex = /^[a-zA-Z0-9\.]+@([\w]+\.)+[\w]{2,4}$/;

const AddContactSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Too Long!')
        .required('Required'),
    // job_title: Yup.string()
    //     .max(255, 'Too Long!'),
    company: Yup.string()
        .max(255, 'Too Long!')
        .required('Required'),
    mobile: Yup.string()
        .matches(phoneRegex, 'Invalid phone number!'),
    email: Yup.string()
        .matches(emailRegex,'Invalid email address!')
        .required('Required'),
    fax: Yup.string()
        .matches(phoneRegex, 'Invalid fax number!'),
    // address: Yup.string()
    //     .max(255, 'Too Long!'),
    website: Yup.string()
        .max(255, 'Too Long!')
        .matches(websiteRegex, 'Invalid website address!'),
});

export default AddContactSchema;