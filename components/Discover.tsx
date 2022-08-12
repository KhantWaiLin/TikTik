import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover = () => {
  
  const router = useRouter();
  const {topic} = router.query;

  const activeTopicStyle = 'flex items-center cursor-pointer text-[#F51997] gap-2 justify-center xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full';
  const topicStyle = 'flex items-center cursor-pointer text-black gap-2 justify-center xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full';
  return (
    <div
    className='xl:border-b-2 xl:border-gray-200 
    pb-6'
    >
      <p
      className='text-gray-500 font-semibold 
      hidden m-3 mt-4 xl:block'
      >
        Popular Topics
        </p>
        <div
        className='flex flex-wrap gap-3'>
          {topics.map((item)=>(
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic === item.name? activeTopicStyle: topicStyle}>
                <span className='text-2xl font-bold xl:text-md'>
                  {item.icon}
                  </span>
                <span
                className='font-medium text-md hidden 
                xl:block capitalize'
                >
                  {item.name}
                  </span>

              </div>

            </Link>
          ))}
         
        </div>
    </div>
  )
}

export default Discover