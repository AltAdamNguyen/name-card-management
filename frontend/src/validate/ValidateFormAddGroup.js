import * as Yup from 'yup';

const AddGroupSchema = Yup.object().shape({
    group_name: Yup.string().required('Required').nullable(),
})
export default AddGroupSchema;