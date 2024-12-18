import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { data, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const PaginatedPost = () => {
    const [page, setPage] = useState(1);

    const fetchPosts = (page) => {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/?_limit=4&_page=${page}`)
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => fetchPosts(page),
    })

    if (isPending) return <h1 className='text-center mt-40 text-4xl'>Loading...</h1>
    if (error) return <h1 className='text-center mt-40 text-4xl'>An error has occurred: {error.message} </h1>

    return (
        <div className='flex flex-col  gap-5 mx-4 my-4 md:mx-8 lg:mx-12 xl:mx-20'>
            {
                data?.data.map((post) => (
                    <Link to={`/rq-posts/${post.id}`}>
                        <div key={post.id} className='bg-gray-100 p-4 rounded-xl hover:bg-slate-200 duration-200'>
                            <h1 className='text-xl text-center font-bold'>{post.title}</h1>
                            <p className='text-lg  text-justify'>{post.body}</p>
                        </div>
                    </Link>
                ))
            }
            <div className='flex gap-5'>
                <button className={`bg-black text-white text-lg py-1 px-3 rounded-full `} onClick={() => setPage(prev => prev + 1)} disabled={page == 25 ? true : false}>Next</button>
                <button>{page}</button>
                <button className='bg-black text-white text-lg py-1 px-3 rounded-full' onClick={() => setPage(prev => prev - 1)} disabled={page == 0 ? true : false}>Prev</button>
            </div>
        </div>
    )
}

export default PaginatedPost