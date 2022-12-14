import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginpic from '../../../assets/images/login/login.svg'
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import SocialLogin from '../../SharedPages/SocialLogin/SocialLogin';
const Login = () => {
    //navigae
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    //context value
    const { LoginWithemail } = useContext(AuthContext)
    //handlers
    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(email, password);

        LoginWithemail(email, password)
            .then(result => {
                //console.log(result.user);

                const currentUser = {
                    email: result.user.email
                }
                console.log(currentUser);

                // get JWT token
                fetch('https://genious-car-server-with-jwt.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        //setting the token into local storage (not the best practice)
                        localStorage.setItem('genius-Token', data.token)
                        navigate(from, { replace: true })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="hero">
            <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={loginpic} alt="" className='p-10' />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl text-center my-5 font-bold">Login!</h1>
                    {/* form start from here */}
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='login' />
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <p className='text-center py-4'>New to genius car? <Link className='text-orange-600' to='/register'>Register Now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;