import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

function Auth() {
    const { data: session, status } = useSession();

    useEffect(() => {
        // Check if the session is not active and the status is not loading
        if (status === 'unauthenticated') {
            signIn();  // Automatically triggers sign-in
        }
    }, [status]); // Dependency array includes status to react on its changes

    if (session) {
        return (
            <button onClick={() => signOut()}>{session.user?.email}</button>
        );
    } else {
        return (
            <button onClick={() => signIn()}>Login</button>
        );
    }
}

export default Auth;
