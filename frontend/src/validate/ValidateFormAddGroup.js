import * as Yup from 'yup';


const AddGroupSchema = Yup.object().shape({
    group_name: Yup.string().required("Validate_Form_AddGroup_NameGroup").nullable(),
})
export default AddGroupSchema;