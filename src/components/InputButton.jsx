import React from 'react'

const Input = ({setShowForm}) => {
  return (
    <div className='flex gap-5 items-center text-white text-lg'>
      <button onClick={()=>setShowForm(true)} className='bg-[#0F2854] px-3   rounded-lg hover:bg-[#16476A] transition-colors duration-200 cursor-pointer py-2'>Enter detail</button>
      {/* <p className='bg-[#007E6E] size-10 rounded-full flex justify-center items-center'>Or</p> */}
    </div>
  )
}

export default Input
