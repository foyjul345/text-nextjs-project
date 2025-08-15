
import React from 'react'
interface ArticleExcerptProps {
    excerpt : string
}
export default function ArticleExcerpt({excerpt}:ArticleExcerptProps) {
  return (
    <div className='text-[#0000008A] text-base leading-relaxed mb-4 font-light line-clamp-3'>
      {
        excerpt
      }
    </div>
  )
}
