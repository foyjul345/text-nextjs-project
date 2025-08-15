// 'use client';
// import PostForm, { PostFormType } from '@/components/form/PostForm';
// import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
// import { auth } from '@clerk/nextjs/server';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// const AddPostPage = () => {
//     const router = useRouter()
    
//     const handleAddPost = async (data:PostFormType,imagefile:File | null) => {
//         let imageUrl = "";
//         try {
//             if(imagefile){
//             imageUrl = await uploadImageToCloudinary(imagefile);
//         }
//         const postData = {
//             ...data,
//             status:data.status === true,
//             image:imageUrl,
//             caption:data.title,
//             tags:data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
//             meta : {
//                 author : data.author || "Unknown",
//                 authorHref : "/",
//                 category: data.category || "uncategorized",
//                 categoryHref : "/",
//                 date : new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),
//                 readingTime:`${Math.ceil(data.excerpt.split(" ").length/200)} min read`
//             }
//         }


     

//         const res = await fetch("/api/article", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(postData)
//       })

//         if(!res.ok){
//             throw new Error("failed to post data")
//         }
//         router.push("/dashboard/manage-posts")
//         } catch (error) {
//             alert("Fai;ed to add post. Please try again later.")
//             console.log("error Post :",error)
//         }

        
//     }
//     return (
//         <section>
//             <h1 className='text-3xl font-bold mb-6'>Add New Articles</h1>
//             <PostForm onSubmit={handleAddPost}/>
//         </section>
//     );
// };

// export default AddPostPage;
"use client"
import PostForm, { PostFormType } from '@/components/form/PostForm'
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddPostPage = () => {

  const router = useRouter();

  const handleAddPost = async (data: PostFormType, imageFile: File | null) => {
  try {
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const postData = {
      ...data,
      status : data.status ? data.status === true : data.status === false,
      image: imageUrl,
      caption: data.title,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      meta: {
        author: data.author || "Unknown Author",
        authorHref: `/authors/${data.author.toLowerCase().replace(/\s+/g, '-')}`,
        category: data.category || "Uncategorized",
        categoryHref: `/categories/${data.category.toLowerCase()}`,
        date: today,
        readingTime: `${Math.ceil(data.excerpt.split(" ").length / 200)} min read`,
        authorAvatarUrl: "https://placehold.co/100x100", // 🟡 এটা আপাতত placeholder, চাইলে user info থেকে আনতে পারেন
        displaySection: "General", // optional
      },
    };

    const res = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("API Error:", err);
      throw new Error(err.message || "Failed to add post");
    }

    router.push("/");
  } catch (error) {
    alert("Failed to add post. Please try again.");
    console.error("Error adding post:", error);
  }
};

  return (
    <section>
      <h1 className='text-3xl font-bold mb-6'>Add New Article</h1>
      <PostForm onSubmit={handleAddPost}/>
    </section>
  )
}

export default AddPostPage