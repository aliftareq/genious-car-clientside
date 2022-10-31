import React from 'react';
import About from './About/About';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div className='my-6 p-8 border-2 border-red-600'>
            <Banner></Banner>
            <About></About>
        </div>
    );
};

export default Home;