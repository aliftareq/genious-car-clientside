import React from 'react';
import About from './About/About';
import Banner from './Banner/Banner';
import Services from './Services/Services';

const Home = () => {
    return (
        <div className='my-6 p-8 border-2 border-red-600'>
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;