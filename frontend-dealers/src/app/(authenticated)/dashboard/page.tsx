import Navbar from '@/src/components/Navbar'
import React from 'react'
import Hero from './_components/Hero'
import Evaluations from './_components/Evaluations'
import Footer from './_components/Footer'

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar/>
      <Hero/>  
      <Evaluations/>
      <Footer/>
    </div>
  )
}

export default page