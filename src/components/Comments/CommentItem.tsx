// import { Comment } from '@/types/comments'
// import React from 'react'
// import ReplyForm from './ReplyForm';
// import ReplyList from './ReplyList';
// interface CommentItemprops{
//     comment: Comment;
//     isReplyingTo : boolean;
//     onReplyClick:() => void;
//     onReplySubmit: (content:string) => void
//     isSubmitting:boolean
// }
// export default function CommentItem({comment,isReplyingTo,onReplyClick,onReplySubmit,isSubmitting}:CommentItemprops) {
//   return (
//     <div className='mb-6'>
      
//       <div className='flex items-start space-x-4'>
//         <img src={comment.authorImageUrl || "https://placehold.co/50x50"} alt={"Image Tag"} className='w-12 h-12 rounded-full' />
//         <div>
//           <p>{comment.content}</p>
//           <div className='text-sm text-gray-600'>
//             <strong>{comment.author}</strong>
//             {comment.createdAt && <> . {new Date(comment.createdAt).toLocaleString()}</>}
//           </div>
//           <button onClick={onReplyClick} className='text-sm text-blue-500 hover:underline mt-1 cursor-pointer'>
//             {isReplyingTo ? "Cancel " : "Reply"}
//           </button>
//         </div>
//       </div>
//       {
//         comment.replyText.length > 0 && <ReplyList replies={comment.replyText}/>
//       }
//       {
//         isReplyingTo && (
//           <ReplyForm
//           onSubmit={onReplySubmit}
//           issubmiting={isSubmitting}
//           placeholder={`Reply to ${comment.author}...`}
//           />
//         )
//       }
//     </div>
//   )
// }


import { Comment } from "@/types/comments";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";


type Props = {
  comment: Comment;
  isReplying: boolean;
  onReplyClick: () => void;
  onReplySubmit: (content: string) => void;
  isSubmitting: boolean;
};

export default function CommentItem({
  comment,
  isReplying,
  onReplyClick,
  onReplySubmit,
  isSubmitting,
}: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-start space-x-4">
        <img
          src={comment.authorImageUrl || 'https://placehold.co/50x50'}
          alt={comment.author}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p>{comment.content}</p>
          <div className="text-sm text-gray-600">
            <strong>{comment.author}</strong>
            {comment.createdAt && <> • {new Date(comment.createdAt).toLocaleString()}</>}
          </div>
          <button
            onClick={onReplyClick}
            className="text-sm text-blue-500 hover:underline mt-1"
          >
            {isReplying ? 'Cancel' : 'Reply'}
          </button>
        </div>
      </div>

      {comment.replyText?.length > 0 && <ReplyList replies={comment.replyText} />}
      {isReplying && (
        <ReplyForm
          onSubmit={onReplySubmit}
          isSubmitting={isSubmitting}
          placeholder={`Replying to ${comment.author}...`}
        />
      )}
    </div>
  );
}
