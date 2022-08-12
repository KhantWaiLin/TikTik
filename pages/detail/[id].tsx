import React,{useState,useEffect,useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import {HiVolumeUp,HiVolumeOff} from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore' 
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';


interface Iprops{
  postDetails: Video
}

const Detail = ({postDetails}:Iprops) => {
  const [post,setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isMuted,setIsMuted] = useState(false);
  const router = useRouter();
  const [comment,setComment] = useState('');
  const [isPostingComment,setIsPostingComment] = useState(false);

  const {userProfile}:any = useAuthStore();

  

  const onVideoClick = ()=>{
    if(playing){
      videoRef?.current?.pause();
      setPlaying(false);
    }else{
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  useEffect(() => {
    if(post && videoRef?.current){
        videoRef.current.muted = isMuted;
    }
   }, [post,isMuted]);

   const handleLike = async (like:boolean)=>{
    if(userProfile){
      const {data} = await axios.put(`${BASE_URL}/api/like`,{
        userId: userProfile._id,
        postId : post._id,
        like

      });

      setPost({...post,likes: data.likes});
      
    }

   }
   const addComment = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(userProfile && comment){
      setIsPostingComment(true);

      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`,{
        userId: userProfile._id,
        comment
      });

      setPost({...post,comments: data.comments});
      setComment('');
      setIsPostingComment(false);

    }


   }

   if(!post) return (null);

  return (
    <div className=' flex w-full absolute top-0 left-0 bg-white flex-wrap lg:flex-nowrap '>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center bg-black'>
        <div className='absolute left-2 top-6 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer ' onClick={()=>router.back()}>
            <MdOutlineCancel className='text-white text-[35px]'/>
          </p>

        </div>
        <div className='relative'>
          <div className="lg:h-[100vh] h-[60vh]">
            <video 
            ref = {videoRef}
            loop
            onClick={onVideoClick}
            className='h-full cursor-pointer'
            src={post.video.asset.url}></video>

          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl'/>
              </button>
            )}

          </div>

        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10'>
            {isMuted? 
             <button onClick={()=>{
                 setIsMuted(false);
             }}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl'/>
             </button>: 
             (<button onClick={()=>{
                 setIsMuted(true);
             }}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
             </button>)} 

        </div>

      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-10 mt-10'>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
                    <Link href='/'>
                        <Image 
                        src={post.postedBy.image}
                        alt="profile photo" 
                        layout='responsive'
                        width={62}
                        height={62}
                        className="rounded-full "/> 
                    </Link>

                </div>
                <div>
                    <Link href='/'>
                        <div className='mt-3 flex flex-col  gap-2'>
                            <p className='flex items-center gap-2 md:text-md font-bold text-primary'>
                                {post.postedBy.userName}{` `}
                                <GoVerified className='text-blue-400 text-md' />
                            </p>
                            <p className='font-md capitalize text-gay-500 text-xs hidden md:block'>
                                {post.postedBy.userName}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <p className='px-10 text-lg text-gray-600'>
              {post.caption}
            </p>
            <div className='mt-10 pt-10'>
              {userProfile && (
                <LikeButton 
                   likes = {post.likes}
                   handleLike = {()=>{handleLike(true)}}
                   handleDislike = {()=>{handleLike(false)}}
                  />
                  
              )}

            </div>
            <Comments 
             comment = {comment}
             setComment = {setComment}
             addComment = {addComment}
             comments = {post.comments}
             isPostingComment = {isPostingComment} />
 
        </div>

      </div>

    </div>
  )
}

export const getServerSideProps = async ({params:{id}}:{params:{id:string}})=>{

  const {data} = await axios.get(`${BASE_URL}/api/post/${id}`);

  return{
    props: {postDetails: data}
  }

}

export default Detail;