'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { BsChevronDown, BsInstagram, BsSearch } from 'react-icons/bs';
import { FaBlog, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface NavItem {
    label: string,
    href: string,
    subItems?: NavItem[];
}

const mainNavItem: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "Categories", href: "/categories", subItems: [
            { label: "Politics", href: "/categories/politics" },
            { label: "Health", href: "/categories/health" },
            { label: "Design", href: "/categories/design" }
        ]
    },
    { label: "Lifestyle", href: "/categories/lifestyle" },
    { label: "Education", href: "/categories/education" },
    { label: "Health", href: "/categories/health" },
    { label: "Design", href: "/categories/design" },
    { label: "Technology", href: "/categories/technology" },
    { label: "Culture", href: "/categories/culture" },
    { label: "Contact", href: "/categories/contact" },
    { label: "About", href: "/categories/about" },

    {
        label: "Categories", href: "#", subItems: [

            { label: "Search", href: "/search" },
            { label: "About", href: "/about" },
            { label: "Private-policy", href: "/private-policy" },
            { label: "Terms and Service", href: "/terms-and-service" },

        ]
    }

]

const Navbar = () => {

    const pathName = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const theme = "light"

    return (
        <header className="relative bg-white font-lora text-gray-800">

            {/* Top header */}
            <div className="hidden lg:block py-3 bg-gray-50">
                <div className='blog-container  flex items-center justify-between'>
                    <h1 className='flex-shrink-0'>
                        <Link href={'/'} className='text-2xl flex items-center font-semibold to-gray-900 hover:text-primary
                        transition-colors duration-300'>
                            <FaBlog />
                            <span className='ml-1'>Blog</span>
                        </Link>
                    </h1>
                    
                    <div className='flex items-center space-x-3'>
                        <div className='relative'>
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className='p-2 rounded-full
                            text-gray-500 cursor-pointer hover:text-gray-700 transition-colors focus:outline '><BsSearch /> </button>
                            {
                                isSearchOpen && (
                                    <form action="/search" className='absolute top-full right-0 pt-2 mt-2 
                                        bg-whiter rounded-lg shadow-lg  w-48 md:w-72 x-10 border border-gray-700'>
                                        <input type="text" name="q" placeholder='search ...'
                                            className='w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 focus:outline-none' />
                                    </form>
                                )
                            }
                        </div>
                        <button className='p-2 rounded-full text-gray-500 hover:text-primary 
                        cursor-pointer transition-colors focus:outline-none  focus:right-2 focus:ring-primary'>
                            {
                                theme === "light" ? <IoMdMoon /> : <IoMdSunny />
                            }
                        </button>


                        {/* social network */}
                        <ul className='flex space-x-3'>
                            <li className='border p-2 rounded-full border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none 
                            focus:right-2 focus:ring-primary'>
                                <Link href={"#"} className='text-gray-500'>
                                    <FaTwitter size={12} />
                                </Link>
                            </li>
                            <li className='border p-2 rounded-full border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none 
                            focus:right-2 focus:ring-primary'>
                                <Link href={"#"} className='text-gray-500'>
                                    <FaFacebookF size={12} />
                                </Link>
                            </li>
                            <li className='border p-2 rounded-full border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none 
                            focus:right-2 focus:ring-primary'>
                                <Link href={"#"} className='text-gray-500'>
                                    <BsInstagram size={12} />
                                </Link>
                            </li>
                        </ul>
                        <Link href={'/contact'} className='px-5 py-2 border border-gray-300 text-gray-800 rounded-md
                        hover:bg-green-600 hover:text-white transition-colors focus:outline-none  focus:right-2 focus:ring-primary '>
                            Contact
                        </Link>
                        <SignedOut>
                            <SignInButton mode='modal'>
                                <button className='px-5 py-1.5 border bg-green-600 border-gray-300 text-white rounded-md
                        hover:bg-gray-100 hover:text-black transition-colors focus:outline-none  focus:right-2 focus:ring-primary'>Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton>

                            </UserButton>
                        </SignedIn>
                    </div>



                </div>
            </div>




            {/* main navigation */}

            <nav className='py-3 border-b border-gray-200'>
                {/* large device */}
                <div className='blog-container'>
                    {/* mobile menu toggle (hamburger) */}
                    <div className='lg:hidden flex justify-between'>
                        <h1 className='flex-shrink-0'>
                            <Link href={'/'} className='text-2xl flex items-center font-semibold to-gray-900 hover:text-primary
                        transition-colors duration-300'>
                                <FaBlog />
                                <span className='ml-1'>Blog</span>
                            </Link>
                        </h1>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200
                            focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300 lg:hidden'>
                            {
                                isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />
                            }
                        </button>
                    </div>
                    <ul className='hidden lg:flex items-center justify-between space-x-6'>
                        {
                            mainNavItem.map((item,index) => {
                                const isActive = pathName === item.href

                                return (
                                    <li key={index} className='group relative'>
                                        <Link href={item.href} className={`inline-flex items-center text-sm uppercase font-medium rounded-md text-gray-500 
                                            hover:text-primary ${isActive ? "font-semibold text-primary" : ""}`} >
                                            {item.label}
                                            {item.subItems && <BsChevronDown size={16} className='ml-1 group-hover:rotate-180
                                                transition-transform'/>}
                                        </Link>
                                        {
                                            item.subItems && [
                                                <ul key={index} className='absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-lg rounded-md 
                                                        overflow-hidden z-20 min-w-[230px] border border-gray-200'>
                                                    {item.subItems.map((subitem) => (
                                                        <li className='pt-1' key={subitem.label}>
                                                            <Link href={subitem.href} className='block px-4 py-2 text-sm uppercase
                                                                    text-gray-700 hover:bg-gray-100  transition-colors'>{subitem.label}</Link>
                                                        
                                                        </li>
                                                    ))}
                                                </ul>
                                            ]
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* mabile menu */}

                {
                    isMobileMenuOpen && (
                        <div className='lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto'>
                            <div className="flex justify-end p-4 ">
                                <button onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)} className='p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100
                                focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300'>
                                    <HiOutlineX size={24} />
                                </button>
                            </div>
                            <ul className='flex flex-col p-4 space-y-2'>
                                {
                                    
                                    mainNavItem.map((item,index) => {
                                        const isActive = pathName === item.href
                                        return (
                                            <li key={item.label} className='group relative'>
                                                <Link href={item.href} className={`inline-flex items-center text-sm uppercase font-medium rounded-md text-gray-500 
                                            hover:text-primary ${isActive ? "font-semibold text-primary" : ""}`} >
                                                    {item.label}
                                                    {item.subItems && <BsChevronDown size={16} className='ml-1 group-hover:rotate-180
                                                transition-transform'/>}
                                                </Link>
                                                {
                                                    item.subItems && [
                                                        <ul key={index} className='absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-lg rounded-md 
                                                        overflow-hidden z-20 min-w-[230px] border border-gray-200'>
                                                            {item.subItems.map((subitem,index) => (
                                                                <li className='pt-1' key={index}>
                                                                    <Link href={subitem.href} className='block px-4 py-2 text-sm uppercase
                                                                    text-gray-700 hover:bg-gray-100  transition-colors'>{subitem.label}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ]
                                                }
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    <SignedOut>
                            <SignInButton mode='modal'>
                                <button className='px-5 py-1.5 border bg-green-600 border-gray-300 text-white rounded-md
                        hover:bg-gray-100 hover:text-black transition-colors focus:outline-none  focus:right-2 focus:ring-primary'>Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton>

                            </UserButton>
                        </SignedIn>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </nav>


        </header>
    );
};

export default Navbar;