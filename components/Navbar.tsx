"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/constants';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import images from '@/public/images';

const Navbar = () => {

    const [toggle, setToggle ] = useState(false);
    // const [active, setActive] = useState('');
    const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
    const { data: session } = useSession() // Fetch the session

    const handleMouseEnter = (id: string) => {
        setShowSubMenu(id);
    };

    const handleMouseLeave = () => {
        setShowSubMenu(null);
    };



  return (
    <nav className='bg-gray-200 fixed shadow-2xl z-50 top-0 left-0 w-full text-black padding'>

        <div className='flex items-center justify-between lg:px-12'>
            <div className='cursor-pointer'>
                <Image 
                    src={images.logodark} 
                    width={120} 
                    height={60} 
                    alt='herb of the world logo'
                    className='object-contain w-[98px] h-[80] md:w-24 '
                />
            </div>

            {/* nav display as flex for larger screens if there is no session */}
            <div className='flex flex-row item-center mt-2 cursor-pointer lg:hidden'>
                {session && (
                    <div className='flex flex-row space-x-4 mt-2'>
                        <Link href='/user'>
                            <Image src="/icons/account.svg" width={25} height={30} alt='account'/>
                        </Link>
                        <Link href='/cart/4'>
                            <div className='flex mr-6'>
                                <p className='bg-white h-4 text-black rounded-full px-1 text-[10px]'>2</p>
                                <Image src="/icons/cart.svg" width={25} height={30} alt='cart'/>
                            </div>
                        </Link>
                    </div>
                )}
                <Image 
                    src={toggle ? '/icons/close.svg' : '/icons/menu.svg'} 
                    width={40} 
                    height={30} 
                    alt='menu'
                    onClick={() => setToggle(!toggle)}
                />
            </div>

            {/* Nav links for larger screens */}
            <ul className='hidden lg:flex items-center justify-center space-x-6'>
                {navLinks.map((nav) => (
                    <li
                        key={nav.id}
                        className="text-black hover:underline py-2 hover:lg:text-custom-green font-bold lg:transitioning lg:py-4 text-[16px] relative"
                        onMouseEnter={() => handleMouseEnter(nav.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href={nav.link || '#'}>{nav.title}</Link>

                        {/* Render submenu if available */}
                        {nav.subMenu && showSubMenu === nav.id && (
                            <ul className='absolute left-0 top-full font-light w-[180px] mt-0 bg-white text-black py-2 shadow-lg rounded'>
                                {nav.subMenu.map((subNav) => (
                                    <li key={subNav.title} className='px-4 py-2 hover:bg-gray-200'>
                                        <Link href={subNav.link}>{subNav.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            {/* nav display as flex for larger screens if there is a session */}
            {/* {session ? (
                <ul className='hidden lg:flex item-center justify-center space-x-6'>
                    {navLinks.map((nav) => (
                        <li key={nav.id} 
                            className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px] relative"
                            onMouseEnter={() => handleMouseEnter(nav.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setActive(nav.title)}
                        >
                           {(nav.id === 'login' || nav.id === 'signup') && session ? (
                                nav.id === 'login' ? (
                                    <Link href="" onClick={() => signOut()}>
                                        SignOut
                                    </Link>
                                ) : null
                            ) : (
                                <a href={nav.link}>{nav.title}</a>
                            )}
                        </li>
                    ))}
                    <li className='py-4'>
                        <Link href='/user'>
                            <Image src="/icons/account.svg" width={25} height={30} alt='account'/>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link href='/cart/4'>
                            <div className='flex mr-6'>
                                <p className='bg-white h-4 text-black rounded-full px-1 text-[10px]'>2</p>
                                <Image src="/icons/cart.svg" width={25} height={30} alt='cart'/>
                            </div>
                        </Link>
                    </li>
                </ul>

            ):(
                <ul className='hidden lg:flex item-center justify-center space-x-6'>
                    {navLinks.map((nav) => (
                        <li key={nav.id} 
                            className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px]"
                            onClick={() => setActive(nav.title)}
                        >

                        <a href={nav.link}>{nav.title}</a>
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
        
        {/* Display as drop down on mobile view */}
        <ul className={`${toggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300 bg-mobile-nav overflow-hidden`}>
            {navLinks.map((nav) => (
                <li key={nav.id} 
                    className="text-black hover:font-bold py-2 hover:lg:text-custom-green lg:transitioning lg:py-4 font-light text-[16px]"
                >
                    {(nav.id === 'login' || nav.id === 'signup') && session ? (
                        nav.id === 'login' ? (
                            <Link href="" onClick={() => signOut()}>
                                SignOut
                            </Link>
                        ) : null
                    ) : (
                        <a href={nav.link}>{nav.title}</a>
                    )}
                </li>
            ))}
        </ul>

    </nav>
  )
}

export default Navbar