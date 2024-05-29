import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from './contexts/Globalcontext.jsx';

export default function RequireAuth({ children }) {
    const { user } = useContext(GlobalContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};