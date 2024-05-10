import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react';
function Auth() {
    const {data: session} = useSession();
    if(session)

  return (
    <button onClick={()=>signOut()}>{session.user?.email}</button>
  )
    else
        return (
        <button onClick={()=>signIn()}>Login</button>
        );
}

export default Auth