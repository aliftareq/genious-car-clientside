import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    //context data
    const { user } = useContext(AuthContext)
    //states
    const [orders, setOrders] = useState([])
    const [refresh, serRefresh] = useState(false)
    //loading data
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email, refresh])
    //console.log(orders);

    //handlers
    const handleDelete = (id) => {
        const Proceed = window.confirm('Are you sure You want to delete this order?')
        if (Proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
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
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
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