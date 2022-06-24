import * as Yup from 'yup';

const phoneRegex = /^((0[3|5|7|8|9])+([0-9]{8})|(84[3|5|7|8|9])+([0-9]{8}))$/;

const AddContactSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Too Long!')
        .required('Required'),
    job_title: Yup.string()
        .max(255, 'Too Long!'),
    company: Yup.string()
        .max(255, 'Too Long!')
        .required('Required'),
    mobile: Yup.string()
        .matches(phoneRegex, 'Invalid phone number!'),
    email: Yup.string()
        .email('Invalid email address!')
        .required('Required'),
    fax: Yup.string()
        .matches(phoneRegex, 'Invalid fax number!'),
    address: Yup.string()
        .max(255, 'Too Long!'),
    website: Yup.string()
        .max(255, 'Too Long!')
        .url('Invalid url!'),
});

export default AddContactSchema;