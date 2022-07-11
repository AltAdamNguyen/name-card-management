import * as Yup from 'yup';

const TransferSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
})

export default TransferSchema;