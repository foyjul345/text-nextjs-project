import PostMeta from '@/components/ui/PostMeta'
import { IArticle } from '@/models/Article'
import Link from 'next/link'
import React from 'react'
interface  TrendingArticlsItemProps {
    article : IArticle,
    index : number
}
export default function TrendingArticlsItem({article,index}:TrendingArticlsItemProps) {
  return (
    <li className={"flex items-center mb-6"}>
        <div className='shrink-0 font-semibold text-gray-300 mr-4'>
            {`0${index+1}`}
        </div>
        <div>
          <h5 className='text-base font-bold mb-2 leading-tight'>
            <Link  href={`/articles/${article._id}`} className='text-[#2E2E2E] hover:text-primary transition-colors' >
           {article.title} 
           </Link> 
           </h5>
           <PostMeta  {...article.meta}/>
        </div>
    </li>
  )
}
