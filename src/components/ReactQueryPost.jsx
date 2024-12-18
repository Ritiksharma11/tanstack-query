import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const ReactQueryPost = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json(),
      ),
    staleTime: 60000,
  })

  if (isPending) return <h1 className='text-center mt-40 text-4xl'>Loading...</h1>
  if (error) return <h1 className='text-center mt-40 text-4xl'>An error has occurred: {error.message} </h1>

  return (
    <div className='flex flex-col  gap-5 mx-4 my-4 md:mx-8 lg:mx-12 xl:mx-20'>
      {
        data.map((post) => (
          <Link to={`/rq-posts/${post.id}`}>
            <div key={post.id} className='bg-gray-100 p-4 rounded-xl hover:bg-slate-200 duration-200'>
              <h1 className='text-xl text-center font-bold'>{post.title}</h1>
              <p className='text-lg  text-justify'>{post.body}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ReactQueryPost