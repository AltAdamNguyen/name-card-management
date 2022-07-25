import * as Yup from 'yup';

const StatusSchema = Yup.object().shape({
    reason: Yup.string().required('Required').nullable(),
})

export default StatusSchema;