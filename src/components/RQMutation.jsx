import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

// GET Method 
const fetchPosts = () => {
    return axios.get('http://localhost:4000/posts');
}

// POST Method 
const addPost = (post) => {
    return axios.post('http://localhost:4000/posts', post);
}

const RQMutation = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 60000,
    })

    const { mutate } = useMutation({
        mutationFn: addPost
    })

    const handleSubmit = () => {
        e.preventDefault();
        console.log({ title, body })
        const post = { title, body };
        mutate(post)
        setBody('')
        setTitle('')
    }

    if (isPending) return <h1 className='text-center mt-40 text-4xl'>Loading...</h1>
    if (error) return <h1 className='text-center mt-40 text-4xl'>An error has occurred: {error.message} </h1>

    return (
        <>
            <form onSubmit={handleSubmit} className='mx-4 md:mx-8 my-5 flex flex-wrap gap-5' >
                <input type="text" placeholder='Enter Title...' value={title} onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-black outline-none py-1 px-2 rounded-md'
                />
                <input type="text" placeholder='Enter Body...' value={body} onChange={(e) => setBody(e.target.value)}
                    className='border-2 border-black outline-none py-1 px-2 rounded-md'
                />
                <input type="submit" className='bg-black text-white py-1 px-4 rounded-full' />
            </form>
            <div className='flex flex-col  gap-5 mx-4 my-4 md:mx-8 lg:mx-12 xl:mx-20'>
                {
                    data?.data.map((post) => (
                        <Link to={`/rq-posts/${post.id}`}>
                            <div key={post.id} className='bg-gray-100 p-4 rounded-xl flex items-center gap-5 hover:bg-slate-200 duration-200'>
                                <h1 className='text-xl text-center font-bold'>{post.title}</h1>
                                <p className='text-lg  text-justify'>{post.body}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default RQMutation