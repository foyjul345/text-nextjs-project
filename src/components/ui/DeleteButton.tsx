'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const DeleteButton = ({id}:{id:string}) => {
    const router = useRouter()
    const handleDelete = async () => { 
        if(!confirm("Are you sure you want to delete this article")) return;
        try {
            const res = await fetch(`/api/article/${id}`,{
                method : "DELETE"
            })

            if(!res.ok){
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to delete article")
            }

            alert("Delete Successfully")

            router.refresh();
        } catch (error : any) {
            console.error("Failed to delete article",error)
            alert(error.message || "An error occured while deleting ther")
        }
     }
    return (
        <button onClick={handleDelete} className='text-red-500 hover:underline cursor-pointer'>
            Delete
        </button>
    );
};

export default DeleteButton;