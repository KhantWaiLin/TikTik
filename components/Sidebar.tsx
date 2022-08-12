import React,{useState} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';

import Discover from './Discover';
import SuggestedAccount from './SuggestedAccount';
import Footer from './Footer';

const Sidebar = () => {

    const userProfile = false;

    const [showSideBar,setShowSideBar] = useState(true);
    const normalLink = 'flex font-semibold rounded text-[#F51997] align-center gap-3 hover:bg-primary pad-3 justify-center xl:justify-start cursor-pointer';

  return (
    <div>
        <div 
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={()=>setShowSideBar((prev)=> !prev)}>
            {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu /> }
        </div>
        {showSideBar && (
            <div className='xl:w-400 w-20 flex flex-col justify-start
            mb-10 border-r-2 border-gray-100 xl:border-3 p-3'>
                <div className='xl:border-b-2 border-gray-200
                xl:pb-4'>
                    <Link href='/'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                for you
                            </span>
                        </div>
                    </Link>

                </div>
            <Discover />
            <SuggestedAccount />
            <Footer />
            </div>
        )}
    </div>
  )
}

export default Sidebar