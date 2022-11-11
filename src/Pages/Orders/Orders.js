import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    //context data
    const { user, LogOut } = useContext(AuthContext)
    //states
    const [orders, setOrders] = useState([])
    const [refresh, serRefresh] = useState(false)
    //loading data
    useEffect(() => {
        fetch(`https://genious-car-server-with-jwt.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-Token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return LogOut()
                }
                return res.json()
            })
            .then(data => setOrders(data))
    }, [user?.email, refresh, LogOut])
    //console.log(orders);

    //handlers
    const handleDelete = (id) => {
        const Proceed = window.confirm('Are you sure You want to delete this order?')
        if (Proceed) {
            fetch(`https://genious-car-server-with-jwt.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-Token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.warn('This order has been deleted')
                        serRefresh(!refresh)
                    }
                })

        }
    }
    const handleStatusUpdate = (id) => {
        fetch(`https://genious-car-server-with-jwt.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-Token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Order has been approved')
                    serRefresh(!refresh)
                }
            })
    }
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-3'>You have {orders.length} number of orders.</h1>
            <div className="overflow-x-auto w-full p-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Cancel order</th>
                            <th>Name</th>
                            <th>service</th>
                            <th>Favorite Color</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default Orders;