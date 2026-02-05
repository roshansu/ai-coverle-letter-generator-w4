import React from 'react'
import { useState } from 'react'
import Input from './components/InputButton'
import Nav from './components/Nav'
import InputForm from './components/InputForm'
import { GoogleGenAI } from "@google/genai";
const apiurl = import.meta.env.VITE_API_URL
import ReactMarkdown from "react-markdown";

const App = () => {
  const [showForm, setShowForm] = useState(false)
  const [load,setLoad] = useState(false)
  const [text, setText] = useState('Click on enter details')

  async function generateLetter(detail) {
    console.log("final data",detail)
    try{
      setText("Generating please wait....")
    const prompt = `
      Write a professional cover letter.

    Candidate: ${detail.name}
    Role: ${detail.role}
    Company: ${detail.company}
    Skills: ${detail.skills}

    Resume:
    ${detail.resume}

    Use proper paragraphs and professional tone.
  `;

  const ai = new GoogleGenAI({
    apiKey: apiurl
  });


  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  console.log(response.text);

   setText(response.text)
   setLoad(true)

  } catch (err) {
    console.error("ERROR:", err);
    setText(err)
  }
  }

  async function handleCopy(){
    try {
      await navigator.clipboard.writeText(text);
      // Reset the "copied" state after a short delay
     alert("cpoied successfull")
    } catch (err) {
       alert("error while cpying")
    }
  }

  return (
  <div className=''>
    <Nav/>
    {
      showForm? <InputForm setShowForm={setShowForm} generateLetter={generateLetter} /> : ''
    }
    <div className='flex lg:flex-row flex-col gap-5 lg:p-10 p-3  h-screen justify-center  bg-[#EAEFEF]'>
      <div className='lg:w-1/2 ai-box relative overflow-y-scroll rounded-lg min-h-[70%] shadow-lg shadow-gray-300 border border-gray-300'>
       <ReactMarkdown>{text}</ReactMarkdown>
       
      </div>
      <div className='lg:mt-0 mt-5'>
        <Input setShowForm={setShowForm}  />
         <button onClick={handleCopy} className={`${load?'block':'hidden'} bg-[#1A2CA3] px-3 text-lg mt-3 py-1 rounded-md text-white relative top-1 right-1 cursor-pointer`}>
          Copy
        </button>
      </div>
    </div>
  </div>
  )
}

export default App
