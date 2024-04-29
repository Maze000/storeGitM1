import { useState, useEffect } from 'react';


function parseJwt(token) {
    try {
        if(token !== null){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return payload;
    }
    return null
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token4'));


    const isTokenExpired = (token) => {
        const payload = parseJwt(token);
        if (!payload) return true;
        const currentTime = Date.now() / 1000;
        return currentTime > payload.exp;
    };
    
    useEffect(() => {
        if (token && isTokenExpired(token)) {
           
            localStorage.removeItem('token4');
            setToken(null);
        }
    }, [token]);


    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token4'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { token, isTokenExpired: isTokenExpired(token) };
}

export default useToken;
