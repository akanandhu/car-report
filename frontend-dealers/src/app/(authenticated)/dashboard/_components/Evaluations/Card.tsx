import Pdf from '@/public/assets/svg/Pdf'
import Share from '@/public/assets/svg/Share'
import Threedots from '@/public/assets/svg/Threedots'
import Button from '@/src/components/Button'
import React from 'react'
import Status from './Status'

const Card = () => {
  return (
    <div data-slot="card" className='bg-white text-card-foreground flex flex-col gap-6 rounded-2xl border py-6 shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
        <div className='p-4'>
            <div className='flex items-start justify-between mb-3'>
                <div className='flex-1'>
                    <h3 className='font-semibold text-lg leading-tight mb-1 text-black'>Model name</h3>
                    <p className='text-sm text-slate-600 font-thin'>Year <span>•</span> 2017</p>
                </div>
                <div>
                    <Status status='Sold'/>
                </div>
            </div>
            <div className='space-y-2 mb-4 text-sm mt-5'>
                <div className='flex justify-between'>
                    <span className='text-slate-600 font-thin'>Seller:</span>
                    <span className='text-black font-medium'>seller</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-slate-600 font-thin'>Created:</span>
                    <span className='font-medium text-black'>26/01/2026</span>
                </div>
            </div>
            <div className='flex gap-2 justify-center'>
                <Button variant='outlined' size='sm' className='py-1 h-9 px-10' startAdornment={<Pdf className='h-4 w-4'/>}>PDF</Button>
                <Button variant='outlined' size='sm' className='h-9 px-9' startAdornment={<Share className='h-4 w-4'/>}>Share</Button>
                <Button variant='outlined' className='h-9 px-3' size='xs'><Threedots className='h-4 w-4'/></Button>
            </div>
        </div>
    </div>
  )
}

export default Card