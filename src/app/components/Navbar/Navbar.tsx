"use client"
import Link from 'next/link';
import './navbar.css';
import Image from 'next/image';
import logoImage from '../../assert/logo.png';
import { usePathname } from 'next/navigation';
import React, { useLayoutEffect, useState } from "react";


const Navbar = () => {
    const pathname = usePathname(); 

    const [islogin, setIsLogin] = useState(pathname === "/login");
    const [isSignup, setIsSingup] = useState(pathname === "/signup");

    console.log("Pathname is: " + pathname + " Login Is: " + islogin)
   
    return (
    <nav className="navbar" style={ islogin || isSignup ? {display: 'none'} : {display: 'flex'}}>
        <Image src={logoImage} alt="Logo" width={100} height={50} className="logo-image" />    
        <div className="list">
            <ul className="navList">
                <div className="navItem">
                <li>
                    <Link href="/" className={`navLink ${pathname === '/' ? 'active' : ''}`}>Home</Link >
                </li>
                </div>
               <div className="navItem">
               <li>
                    <Link href="/publishNewRide" className={`navLink ${pathname.startsWith('/publishNewRide') ? 'active' : ''}`}>Publish New Ride</Link >
                </li>
               </div>
                <div className="navItem">
                <li>
                    <Link href="/planRide" className={`navLink ${pathname.startsWith('/planRide') ? 'active' : ''}`}>Plan Ride</Link >
                </li>
                </div>
                <div className="navItem">
                <li>
                    <Link href="/myRides" className={`navLink ${pathname.startsWith('/myRides') ? 'active' : ''}`}>My Ride</Link >
                </li>
                </div>
            </ul>
        </div>
   
</nav>)
        
    
};

export default Navbar;
