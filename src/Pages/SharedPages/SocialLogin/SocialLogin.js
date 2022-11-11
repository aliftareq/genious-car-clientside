import React from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { googelSignIn } = useContext(AuthContext)
    //navigae
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    //handlers
    const handleGoogleSignIn = () => {
        googelSignIn()
            .then(result => {
                const user = result.user
                console.log(user);

                const currentUser = {
                    email: user.email
                }
                // setting JWT token
                setAuthToken(currentUser)
                //navigatin after successful login
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.error(err.message);
            })
    }
    return (
        <div>
            <p className='text-3xl text-center'>Social Login</p>
            <div className='flex justify-center'>
                <button onClick={handleGoogleSignIn} className='btn'>Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;