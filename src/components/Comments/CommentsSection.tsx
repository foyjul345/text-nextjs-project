// 'use client'
// import { postComment } from '@/lib/postComment';
// import { Comment } from '@/types/comments';
// import { useUser } from '@clerk/nextjs';
// import React, { FormEvent, useState } from 'react'
// import CommentItem from './CommentItem';
// import Pagination from './Pagination';
// interface CommentsSectionprops {
//   articleId: string;
//   initialComments: Comment[]
// }

// export default function CommentsSection({ articleId, initialComments }: CommentsSectionprops) {
//   const { isSignedIn, user, isLoaded } = useUser()
//   const [comments, setComments] = useState<Comment[]>(initialComments)
//   const [replyingTo, setReplyingTo] = useState<string | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   //pagination 
//   const [currentPage, setCurrentPage] = useState(1)
//   const commentPerPage = 5;
//   const pageCount = Math.ceil(comments.length / commentPerPage)

//   const commenstCalculation = (currentPage - 1) * commentPerPage
//   const currentComments = comments.slice(commenstCalculation, currentPage * commentPerPage)

//   //handle reply comment
//   const handleReply = async (text: string, parentId: string) => {
//     if (!isSignedIn) return alert("Please sign in")
//     setIsSubmitting(true)
//     setError(null)
//     try {

//       const updated = await postComment({
//         articleId,
//         author: user?.fullName || user?.username || "Anonymous",
//         content: text,
//         parentId
//       })

//       setComments(comments.map(c => c._id === updated._id ? updated._id : c))
//       setReplyingTo(null)

//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   //handle comment
//   const handleNewComment = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const form = e.currentTarget;
//     const content = form.comment.value

//     if(!isSignedIn){
//       alert("Please Sign in to comment")
//       return;
//     }

//     if (!content.trim() ) {
//       alert("Please write comment properly!")
//       return;
//     }
//     setIsSubmitting(true)
//     try {
//       const newComment = await postComment({
//         articleId,
//         author: user?.fullName || user?.username || "Anonymous",
//         content
//       })
//       alert("Comment post successfully!")
//       setComments([newComment, ...comments])
//       setCurrentPage(1)
//       form.reset()

//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }



//   return (
//     <div className='mt-12'>
//       <h3 className='text-2xl font-bold mb-6'>Comment ({comments.length})</h3>
//       {/* comments list */}
//       <div>
//         {
//           currentComments.map((comment,index) => (
//             <CommentItem key={index}
//               comment={comment}
//               isReplying={replyingTo === comment._id}
//               onReplyClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
//               onReplySubmit={(text: string) => handleReply(text, comment._id)}
//               isSubmitting={isSubmitting}
//             />
//           ))
//         }


//       </div>
//       {/* paginaton */}
//         <Pagination
//         currentPage={currentPage}
//         pageCount={pageCount}
//         onPageChange={setCurrentPage}
//         />

//       {/* new comment form     */}
//       <div className="bg-gray-50 p-8 rounded-lg mt-12">
//         <div className="text-2xl font-bold mb-4">
//           Leave a Reply
//         </div>
//         <p className="text-gray-500 text-sm mb-6">
//           Your email address will not be a Published
//         </p>
//         <form onSubmit={handleNewComment} className="space-y-6">
//           <div>
//             <label htmlFor="content" className='block text-sm font-medium text-gray-700 mb-1'>Comment</label>
//             <textarea name="comment" id="comment" className='w-full p-3 border border-gray-300 rounded-lg
//           focus:ring-blue-500 focus:border-blue-500}' rows={6} required>

//             </textarea>
//           </div>
//           {error && <p className='text-red-500 text-sm'>{error}</p> }
//           <div>
//             <button
//             type='submit' 
//             disabled={isSubmitting}
//             className='w-full px-6 py-3 bg-green-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-green-700
//             disabled:bg-gray-400'>
//               {
//                 isSubmitting ? "Submitting" : "Post Comment"
//               }
//             </button>
//           </div>
//         </form>
//       </div>

//     </div>
//   )
// }
'use client';

import { useUser } from '@clerk/nextjs';
import { useState, FormEvent } from 'react';
import CommentItem from './CommentItem';

import { postComment } from '@/lib/postComment';
import { Comment } from '@/types/comments';
import Pagination from './Pagination';


export default function CommentsSection({ articleId, initialComments }: { articleId: string; initialComments: Comment[] }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const pageCount = Math.ceil(comments.length / commentsPerPage);
  const currentComments = comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

  const handleReply = async (text: string, parentId: string) => {
    if (!isSignedIn) return alert('Please sign in');
    setIsSubmitting(true);
    setError(null);
    try {
      const updated = await postComment({
        articleId,
        author: user?.fullName || 'Anonymous',
        content: text,
        parentId,
      });
      setComments(comments.map(c => (c._id === updated._id ? updated : c)));
      setReplyingTo(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const content = form.comment.value;
    if (!content.trim() || !isSignedIn) return;
    setIsSubmitting(true);
    try {
      const newComment = await postComment({
        articleId,
        author: user?.fullName || 'Anonymous',
        content,
      });
      setComments([newComment, ...comments]);
      setCurrentPage(1);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment List */}
      <div className="space-y-8">
        {currentComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            isReplying={replyingTo === comment._id}
            onReplyClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
            onReplySubmit={(text) => handleReply(text, comment._id)}
            isSubmitting={isSubmitting}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />

      {/* New Comment Form */}
      <div className="bg-gray-50 p-8 rounded-lg mt-12">
        <h3 className="text-2xl font-bold mb-4">Leave a Reply</h3>
        <p className="text-gray-500 text-sm mb-6">Your email address will not be published.</p>

        <form onSubmit={handleNewComment} className="space-y-6">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea
              id="comment"
              name="comment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
