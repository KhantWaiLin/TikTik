import React from 'react';
import { footerList1,footerList2, footerList3 } from '../utils/constants';

const List = ({items,mt}:{items:string[],mt:boolean})=>{
  return(
    <div className={`flex flex-wrap ${mt && 'mt-5'} gap-2`}>
    {items.map((item)=>(
      <p className='text-gray-400 hover:underline
      cursor-pointer text-sm' key={item}>
        {item}
      </p>
    ))}

  </div>
  )

}

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
      <p
      className='mt-5 text-gray-400 text-sm'
      >2022 TikTik</p>
    </div>
  )
}

export default Footer