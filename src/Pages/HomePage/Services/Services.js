import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    //states
    const [services, setServices] = useState([])
    // useeffect
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data.data))
    }, [])
    //console.log(services);
    return (
        <div className='bg-base-200 rounded-lg p-5'>
            <div className='text-center'>
                <p className="text-2xl font-bold text-orange-400">Services</p>
                <h1 className="text-5xl font-semibold text-orange-400">Our Service Area</h1>
                <p className="text-xl my-4">
                    the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
            </div>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;