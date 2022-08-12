import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';
import VIdeoCard from '../components/VIdeoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';

interface Iprops{
   videos: Video[]
 }
 
const Home = ({videos}: Iprops) => {

  return (
   <div className='flex flex-col gap-10 h-full videos'>
    {videos.length? 
      videos.map((video : Video)=>(
        <VIdeoCard post={video} key={video._id} />

      )): <NoResults text={'no videos'} />}

   </div>
  )
}

export const getServerSideProps = async ({query:{topic}}:{query:{topic:string}})=>{

  let response = null

  if(topic){
     response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  else{
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return{
    props: {
      videos: response.data
    }
  }
}

export default Home
