import { createContext, useContext, useEffect, useState } from 'react'
import { fngetCurrentUser } from '@/services/apiAuth'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const getUserTrigger = async () => {
        try {
            const res = await fngetCurrentUser();
            setUser(res.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            //   console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTrigger();
    }, []);
    return <UserContext.Provider value={{ user, loading, getUserTrigger, error }}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;

export const UseUserState = () => {
    return useContext(UserContext)
}