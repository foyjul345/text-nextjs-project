import PostMeta from '@/components/ui/PostMeta'
import { IArticle } from '@/models/Article'
import Link from 'next/link'
import React from 'react'
interface SwipperCardProps {
    article:IArticle
}
export default function SwipperCard({article}:SwipperCardProps) {
  return (
    <div className='rounded-lg overflow-hidden flex flex-col justify-between items-center
    md:flex-row bg-[#FAFAFA]'>
      <div className='p-6 md:p-8 lg:p-10 flex flex-col justify-center w-full md:w-1/2'>
        {
          article.caption && <p className='text-sm uppercase text-gray-500 mb-2 font-semibold tracking-wider'>{article.caption}</p>
        }
        <h2 className='text-xl sm:text-2xl hover:bg-primary font-bold mb-3 leading-tight transition-colors'>
          <Link href={`/articles/${article._id}`}>{article.title}</Link>
        </h2>
        {
          article.excerpt && <div className='mb-4 text-base leading-relaxed text-[#000000]'>
            <p>{article.excerpt}</p>
          </div>
        }

        <PostMeta {...article.meta}/>
      </div>
      <div className='w-full md:w-1/2 h-48 md:h-auto'>
        <img src={article.image} alt={article.title} className='w-full h-full object-cover' />
      </div>
    </div>
  )
}
