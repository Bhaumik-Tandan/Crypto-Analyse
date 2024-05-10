import React from 'react';
import { useSession, signOut } from 'next-auth/react';

function Profile() {
    const { data: session } = useSession();
    return (
        <div style={{
            width: '100%',
            display: 'flex',            
            justifyContent: 'flex-end'
        }}
        >
            <img src={session.user?.image} alt='profile' 
            onClick={() => signOut()}
             style={styles.profileImage} />
        </div>
    )
}

export default Profile;

const styles = {
    profileImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '10px', 
    }
};
