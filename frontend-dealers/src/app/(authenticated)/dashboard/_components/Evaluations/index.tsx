import React from 'react'
import Card from './Card'

const Evaluations = () => {
  return (
    <div className='px-4 py-6 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default Evaluations