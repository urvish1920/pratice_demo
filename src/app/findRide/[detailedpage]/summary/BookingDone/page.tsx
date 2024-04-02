"use client"
import Link from 'next/link';
import styles from './BookingDone.module.css'
import { Button } from '@mui/material';

export default function BookingDone() {

    const handleCheckDetails = async (event:any) => {
        event.preventDefault();
        console.log("Checking details...");
    };
    return (
        <div className={styles.bookingdone}>
            <div className={styles.inner_com}>
            <div className={styles.booking_text}>
                Booking Done  
            </div>
            <Button onClick={handleCheckDetails}   style={{
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: 'darkslategrey',
                        padding: '10px 20px',
                        width:'30vh',
                        marginTop: '20%',
                        marginLeft:'60px'
                    }} >check Details</Button>
            </div>
            
        </div>
    );
}
