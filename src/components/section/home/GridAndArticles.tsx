import { IArticle } from '@/models/Article'
import React from 'react'
import ArticleCardGrid from './ArticleCardGrid'
import Link from 'next/link'
import Image from 'next/image'
interface GridAndArticlesProps {
  article: IArticle[]
}
export default function GridAndArticles({ article }: GridAndArticlesProps) {
  return (
    <div className='pb-12 text-gray-800 px-4 sm:px-6 lg:px-8'>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className='w-full lg:w-10/12 mb-8 lg:mb-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12'>
            {
              article.map((article) => (
                <ArticleCardGrid key={article._id} article={article} />
              ))
            }
          </div>
        </div>
        <div className='w-full lg:w-2/12 flex justify-center items-center lg:block'>
          <Link href={'/'}>
            <Image src={'/images/ads-1.webp'} alt='Advertisement' width={166} height={346} loading='lazy'
              className='w-full h-auto object-cover' />
          </Link>
        </div>
      </div>
    </div>
  )
}
