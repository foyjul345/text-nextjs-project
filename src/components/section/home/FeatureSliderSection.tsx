'use client'
import { IArticle } from '@/models/Article'
import React from 'react'
import { Pagination,Autoplay } from 'swiper/modules';

interface FeatureSliderSectionProps {
  article : IArticle[]
}

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import SwipperCard from './SwipperCard';



// import required modules

export default function FeatureSliderSection({article}:FeatureSliderSectionProps) {

  return (
    <section className='mb-24 py-12 text-gray-700'>
      <div className="px-4 sm:px-6 lg:px-8">
         <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true} 
        breakpoints={{
          
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
         
        }}
        modules={[Pagination,Autoplay]}
        className="rounded-xl px-4 sm:px-6 lg:px-8"
      >
        
        {
          article.map((item, index) => (
            <SwiperSlide key={index}>
              <SwipperCard  article = {item}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      </div>
      <div className='border-t border-gray-200 mt-12 pt-8'></div>
      
    </section>
  )
}
