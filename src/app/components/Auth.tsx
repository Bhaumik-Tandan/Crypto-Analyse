import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Profile from './Profile';

function Auth() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn(); 
        }
    }, [status]);

    if (session) {
        return (
         <Profile/>
        );
    } else {
        return (
            <button onClick={() => signIn()}>Login</button>
        );
    }
}

export default Auth;
