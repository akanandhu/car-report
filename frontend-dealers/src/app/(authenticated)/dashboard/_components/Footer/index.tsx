import React from 'react'

const Footer = () => {
  return (
    <div className='max-w-6xl mx-auto'>

    <div className='mt-3 grid grid-cols-3 gap-4 p-4 bg-background rounded-xl border border-slate-200'>
        <div className='text-center'>
            <div className="text-2xl font-bold text-black">1</div>
            <div className="text-xs text-slate-500">Total</div>    
        </div>
        <div className='text-center'>
            <div className="text-2xl font-bold text-green-500">1</div>
            <div className="text-xs text-slate-500">In Sale</div>    
        </div>
        <div className='text-center'>
            <div className="text-2xl font-bold text-gray-600">1</div>
            <div className="text-xs text-slate-500">Sold</div>    
        </div>
    </div>
    </div>

  )
}

export default Footer