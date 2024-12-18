import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const TraditionalPostFetch = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        } catch (error) {
            setError(true);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if (isLoading) {
        return <div className='text-center mt-40 text-4xl'>Loading...</div>
    }

    if (error) {
        return <div className='text-center mt-40 text-4xl'>Some Error Occured</div>
    }

    return (
        <div className='flex flex-col  gap-5 mx-4 my-4 md:mx-8 lg:mx-12 xl:mx-20'>
            {
                posts.map((post) => (
                    <div key={post.id} className='bg-gray-100 p-4 rounded-xl hover:bg-slate-200 duration-200'>
                        <h1 className='text-xl text-center font-bold'>{post.title}</h1>
                        <p className='text-lg  text-justify'>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default TraditionalPostFetch