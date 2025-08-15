import React from 'react';
interface SectionTitleProps {
    title:string
}
const SectionTitle = ({title}:SectionTitleProps) => {
    return (
        <h2  className=' relative text-xl  mb-8 font-bold text-[#222222]  border-b border-gray-300 pb-2'>
            <span className='pb-2.5 border-b-2 border-gray-400'>{title}</span>
        </h2>
    );
};

export default SectionTitle;