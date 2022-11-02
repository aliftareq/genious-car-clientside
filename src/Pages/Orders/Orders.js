import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Orders = () => {
    //context data
    const { user } = useContext(AuthContext)
    //states
    const [orders, setOrders] = useState({})
    //loading data
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])
    return (
        <div>
            <h1 className='text-3xl font-bold'>You have {orders.length} number of orders.</h1>
        </div>
    );
};

export default Orders;