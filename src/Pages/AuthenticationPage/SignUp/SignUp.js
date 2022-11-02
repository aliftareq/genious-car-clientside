import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/images/login/login.svg'
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    //navigate 
    const navigate = useNavigate()
    //context value
    const { createUser } = useContext(AuthContext)

    //handlers
    const handleLogin = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                navigate('/')
            })
            .catch(err => {
                console.error(err);
            })
    }
    return (
        <div className="hero">
            <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={img} alt="" className='p-10' />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl text-center my-5 font-bold">Signup!</h1>
                    {/* form start from here */}
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>
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
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='sign Up' />
                        </div>
                    </form>
                    <p className='text-center py-4'>Already have an account? <Link className='text-orange-600' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;