import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const RQPostDetail = () => {
    const { postId } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['posts', postId],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) =>
                res.json(),
            ),
        staleTime: 60000,
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;
    return (
        <div className='mx-4 my-4 md:mx-8 lg:mx-12 xl:mx-20'>
            <div className='bg-gray-100 p-4 rounded-xl hover:bg-slate-200 duration-200'>
                <h1 className='text-xl text-center font-bold'>{data.title}</h1>
                <p className='text-lg  text-justify'>{data.body}</p>
            </div>
        </div>
    )
}

export default RQPostDetail