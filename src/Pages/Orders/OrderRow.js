import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const [service, setService] = useState({})
    const { _id, serviceId, serviceName, price, email, phone, status } = order
    useEffect(() => {
        fetch(`http://localhost:5000/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data.data))
            .catch(err => console.log(err))
    }, [serviceId])
    //console.log(service);
    //handlers

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className='btn btn-ghost text-red-500 font-bold'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {service?.img && <img src={service?.img} alt="" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{email}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">{price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">
                    {status
                        ? <p className='bg-green-400 p-3 rounded-lg'>{status}</p>
                        : <p className='bg-gray-400 p-3 rounded-lg'>Pending</p>}
                </button>
            </th>
        </tr>
    );
};

export default OrderRow;