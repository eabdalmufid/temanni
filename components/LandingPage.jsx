"use client"

import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

const LandingPage = () => {
    return (
        <div className="flex flex-col gap-7 items-center justify-center min-h-[calc(100vh-5rem)] text-center px-3">
            <h1 className='text-textPrimary max-w-[55rem] w-full font-poppins font-extrabold text-4xl md:leading-snug md:text-6xl leading-snug text-center'>Empower Connections and Inspire Growth:
                <span className='bg-primary p-3 text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent'>
                    <TypeAnimation
                        sequence={[
                            'Your Learning Community',
                            1000,
                            'Your Learning Partner',
                            1000,
                            'Your Learning Journey',
                            1000,
                            'Your Learning Adventure',
                            1000
                        ]}
                        speed={50}
                        repeat={Infinity}
                    />
                </span>
            </h1>
            <p className='text-textSecondary max-w-[45rem] text-xs md:text-sm'>Welcome to a vibrant community where connections are the threads that weave our learning tapestry. Join us to connect with like-minded individuals, share experiences, and embark on a journey of collaborative growth.</p>
            <Link href={"/login"} className='px-5 py-4 bg-primary rounded-full font-bold hover:bg-secondary text-background w-44 text-basePrimary text-lg'>Join Us!</Link>
        </div>
    )
};

export default LandingPage;