import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    //constext data 
    const { user } = useContext(AuthContext)
    //fetched data
    const data = useLoaderData()
    const service = data.data;
    const { _id, title, price } = service

    //handlers
    const handlePlaceOrder = (e) => {
        e.preventDefault()

        //taking value from >> form
        const form = e.target;
        const name = `${form.fname.value} ${form.lname.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value
        const message = form.message.value;

        const order = {
            serviceId: _id,
            serviceName: title,
            price,
            email,
            phone,
            message,
        }
        console.log(order);
        // toast.success('successfully ordered')
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Your order have been placed Successfully')
                    form.reset()
                }
                else {
                    toast.error('Something Went Worng!!!')
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    return (
        <div className='p-5'>
            <p className='text-3xl font-bold text-center my-4'>
                You are about to order <span className='text-green-300'>{title}</span>
            </p>
            <p className='text-3xl font bold text-center my-4'>
                Pay to order : ${price}
            </p>
            <form onSubmit={handlePlaceOrder}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='fname' type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name='lname' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full" required />
                    <input name='email' type="text" placeholder="Your email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered w-full h-24 my-4" placeholder="Message" required></textarea>
                <div className='flex justify-center'>
                    <input type="submit" className='btn btn-primary' value="Place Your order" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;