import React from 'react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center content-center h-16 mt-2 bg-white text-black relative mb-10' role='navigation'> 
      <a href="/" className="mt-10 scroll-m-20 pb-2 md:text-2xl ml-2 text-xl font-medium tracking-tight transition-colors first:mt-0 ">Gate<span className='text-indigo-700'>Guard</span></a>
      <Image src="https://brdlzzxucjbcvetyfqpt.supabase.co/storage/v1/object/public/assets/taa.png?t=2025-01-24T17%3A28%3A47.622Z" alt="The Airport Authority Logo" className="w-40 md:w-60" width={200} height={250} />
      <Image src="https://brdlzzxucjbcvetyfqpt.supabase.co/storage/v1/object/public/assets/logo-placeholder.png?t=2025-01-24T17%3A28%3A18.442Z" alt="The Placeholder Logo" width={75} height={100} />
    </nav>
  )
}
