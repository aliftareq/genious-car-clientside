import React from 'react';
import './BannerItem.css'
const BannerItem = ({ slide }) => {
    const { img, id, prev, next } = slide
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-image'>
                <img src={img} className="w-full rounded-lg" alt='img' />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                <h1 className='text-5xl font-bold text-white'>
                    Affordable <br />
                    Price For Car <br />
                    Servicing
                </h1>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-2/4">
                <p className='text-xl font-semibold text-white'>
                    There are many variations of passages of  available,
                    but the majority have suffered alteration in some form.
                </p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
                <div className='flex'>
                    <button className="btn btn-warning mx-2">Warning</button>
                    <button className="btn btn-outline btn-warning mx-2">Warning</button>
                </div>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mx-2">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle mx-2">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;