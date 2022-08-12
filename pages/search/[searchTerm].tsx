import React,{useState,useEffect} from "react";
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from "react-icons/go";
import axios from 'axios';

import VIdeoCard from "../../components/VIdeoCard";
import NoResults from "../../components/NoResults";
import { IUser,Video } from "../../types";
import { BASE_URL } from "../../utils";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const Search = ({videos}:{videos:Video[]}) => {

  const {allUsers}  = useAuthStore();
  console.log(allUsers);
   
  const router = useRouter();
  const {searchTerm} : any = router.query;

  const [isAccounts,setIsAccounts] = useState(false);
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos =  !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

 console.log(searchedAccounts);
  return (
    <div className="w-full">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 
        bg-white w-full">
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={()=>setIsAccounts(true)}>
            Accounts
          </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
            onClick={()=>setIsAccounts(false)}>
            Videos
          </p>

        </div>
        {isAccounts?(
          <div className='md:mt-16'>
            {searchedAccounts.length > 0?(
                searchedAccounts.map((user:IUser,idx)=>(
                  <Link href={`/profile/${user._id}`} key={idx}>
                    <div className='flex gap-3  hover:bg-primary p-2
                    cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                      <div>
                           <Image 
                           src={user.image}
                           width={50}
                           height={50}
                           className='rounded-full'
                           alt='user profile'
                           />

                      </div>
                      <div className='hidden xl:block'>
                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                          {user.userName.replaceAll(' ','')}
                          <GoVerified className='text-blue-400'/>
                        </p>
                        <p className='capitalize text-gray-400 text-xs'>
                          {user.userName}
                        </p>
          
                      </div>
                  </div>
           </Link>

                ))
            ):(
              <NoResults text={`No accounts for ${searchTerm}`}/>
            )}
          </div>
        ):(
          <div className="md:mt-16 flex flex-wrap gap-6 
          md:justify-start ">
           {videos.length?(
            <div>
              {videos.map((video:Video,idx)=>(
                <VIdeoCard post={video} key={idx} />
              ))}
            </div>
           ):(
            <NoResults text={`No results for ${searchTerm}`}/>
           )}
          </div>
        )}

    </div>
  )
}

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;