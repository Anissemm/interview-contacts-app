import { getToken, useAppSelector } from '../store'
import { Navigate, Outlet } from 'react-router-dom'

const IsAuthenticated = () => {
    const accessToken = useAppSelector(getToken)

    return (
        !accessToken ? <Navigate to='/' replace={true} /> : <Outlet />
    )
}

export default IsAuthenticated