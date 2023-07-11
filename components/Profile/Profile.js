import dynamic from 'next/dynamic';
import Profooter from './Profooter'

export default function Profile(props) {
    const {user_level} = props.userAvailable;
    
    const DynamicProfile = dynamic(() => import(`./${user_level === "Employee" ? 'EmployeeProfile' : 'UserProfile'}`));
    
    return (
        <>
        <DynamicProfile {...props} />
        <Profooter {...props} />
        </>
    )
}
