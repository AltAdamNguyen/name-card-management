//import liraries
import React from 'react';
import { Input, Spacer } from '@nextui-org/react';
import OrgChart from '../../component/staff/OrgChart';
import './styles.css';
// create a component
const test = {
    id: 1,
    name: 'Đặng Vũ Hoàng Trung',
    role: 'Quản lí',
    email: 'abc@gmail.com',
    childern: [
        {
            id: 2,
            name: 'Nguyễn Văn A',
            role: 'Nhân viên',
            email: 'xyz@gmail.com'
        },
        {
            id: 3,
            name: 'Nguyễn Văn B',
            role: 'Nhân viên',
            email: 'adc@gmail.com',
        },
        {
            id: 4,
            name: 'Nguyễn Văn C',
            role: 'Nhân viên',
            email: 'acsd'
        },
        {
            id: 5,
            name: 'Nguyễn Văn D',
            role: 'Nhân viên',
            email: 'axdf'
        }
    ]
}
const StaffScreen = () => {
    return (
        <div className='staff_container'>
            <Spacer y={1} />
            <Input
                clearable
                placeholder='Tìm kiếm'
                bordered
                color='primary'
                className='staff_container_search'
                width="50%"
            />
            <Spacer y={2} />
            <OrgChart item={test} />
        </div>
    );
};


//make this component available to the app
export default StaffScreen;
