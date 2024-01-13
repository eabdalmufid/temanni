"use client"

// Next Auth
import { signIn } from 'next-auth/react'

// NextJS
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='h-screen w-full bg-basePrimary relative text-textPrimary font-poppins'>

      <div className="absolute inset-0 m-auto max-w-sm h-80 rounded-md  p-3 flex flex-col items-center">

        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/assets/icons/logo.svg"} alt="logo" width={30} height={30} className="w-10 md:w-10" />
          <h2 className=" text-lg md:text-xl font-bold">TEMANNI</h2>
        </Link>

        <h1 className='text-3xl font-light mt-16'>Sign In</h1>

        <div onClick={() => signIn('google', { callbackUrl: "/" })} className="w-full bg-baseSecondary rounded-md py-3 flex items-center justify-center gap-3 hover:bg-baseSecondaryHover cursor-pointer mt-10">
          <Image src={"/assets/icons/google.svg"} alt="google" width={30} height={30} className="w-6" />
          <p className=''>Sign in with Google</p>
        </div>

      </div>
    </div>
  )
}

export default Page