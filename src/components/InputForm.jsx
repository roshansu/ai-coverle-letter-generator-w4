import React from 'react'
import * as pdfjsLib from "pdfjs-dist";
import { useState } from 'react';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const InputForm = ({setShowForm, generateLetter}) => {

    const [form, setForm] = useState({})

  const handleChange = (e)=>{
    e.preventDefault()
      setForm(({
        ...form,
        [e.target.name]: e.target.value
      }))
  }

  const handleFile = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if (file?.type === "application/pdf") {

      console.log("PDF Selected:", file.name);
      const buffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }

      console.log(text);
      setForm(({
        ...form,
        resume: text
      }))
    } else {
      alert("Only PDF allowed");
    }
  };

  console.log(form)

  return (
    <div className='w-screen fixed p-1 flex  justify-center items-center z-50 h-screen bg-black/25 top-0'>
      <form onSubmit={(e)=>{
        e.preventDefault()
        setShowForm(false)
        generateLetter(form)
        }} className='lg:w-1/3 w-full text-lg p-4 rounded-lg  bg-white' action="">
        <div className='flex justify-between text-xl mb-4'>
            <p>Fill the details</p>
            <i onClick={()=>setShowForm(false)} className="fa-solid cursor-pointer fa-x"></i>
        </div>
        <div className='flex-col mb-3  flex gap-2'>
            <label htmlFor="name">Candidate name</label>
            <input required onChange={(e)=>handleChange(e)} className='bg-[#E3E3E3] p-4 rounded-md outline-none' name='name' type="text" placeholder='Enter name' />
        </div>
        <div className='flex-col flex mb-3 gap-2'>
            <label htmlFor="role">Job role</label>
            <input required onChange={(e)=>handleChange(e)} className='bg-[#E3E3E3] p-4 rounded-md outline-none' name='role' type="text" placeholder='Enter job role' />
        </div>
        <div className='flex-col flex mb-3 gap-2'>
            <label htmlFor="company">Company name</label>
            <input required onChange={(e)=>handleChange(e)} className='bg-[#E3E3E3] p-4 rounded-md outline-none' name='company' type="text" placeholder='Enter company name' />
        </div>
        <div className='flex-col  flex gap-2'>
            <label htmlFor="skills">Key skills</label>
            <input required onChange={(e)=>handleChange(e)} className='bg-[#E3E3E3] p-4 rounded-md outline-none' name='skills' type="text" placeholder='Enter key skills' />
        </div>
        {/* <Pdf/> */}
        <div className=' flex bg-[#9E2A3A] px-3 py-2 rounded-lg cursor-pointer justify-center items-center gap-2 text-white text-lg mt-4'>
          <p>Import resume</p>
          <i className="fa-solid fa-file-pdf"></i>
        </div>
        <input required className='p-3 border w-full rounded-lg border-blue-700 mt-3'  onChange={handleFile} type="file" accept='application/pdf' />
        <button type='submit' className='px-3 py-2 rounded-lg bg-[#393D7E] hover:bg-[#5459AC] transition-colors duration-200 cursor-pointer text-white mt-5 '>Submit</button>
      </form>
    </div>
  )
}

export default InputForm
