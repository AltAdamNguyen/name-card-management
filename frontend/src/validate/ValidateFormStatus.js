import * as Yup from 'yup';

const StatusSchema = Yup.object().shape({
    reason_status: Yup.string().required('Required'),
})

export default StatusSchema;