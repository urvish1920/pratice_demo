'use client'
import styles from "./approvalRequest.module.css"
import Image from 'next/image';
import profileImage from '../../../assert/avater.png';
import { Button } from "@mui/material";
import icon from '../../../assert/icon.png';
import { selectPlanRide } from "@/app/GlobalRedux/car-polling/planRideDetialsSlice";
import { useSelector } from "react-redux";

export default function approvalRequest() {
    const rideDetails = useSelector(selectPlanRide);
    return(
        <div>
            <h1 className={styles.heading}>Booking Plan</h1>
            <div className={styles.otcenter}>
                <div className={styles.outercontainer}>
                    <div className={styles.first_container}>
                        <div className={styles.space_between}>
                                        <div className={styles.username}>yash</div>
                                        <div className={styles.img}> 
                                            <Image
                                                src={profileImage}
                                                className={styles.avater}
                                                width={40}
                                                height={34}
                                                alt="Picture of the author"
                                            />
                                        </div>
                        </div>
                        <div className={styles.chat}>     
                                        <Button className={styles.chatButton} style={{marginLeft: '5px', marginTop:'5px'}}>
                                            <Image
                                                src={icon}
                                                className={styles.chaticon}
                                                alt="chat image"
                                            />
                                            <div className={styles.chatMessage}>Ask yash a question</div>
                                        </Button>
                        </div>
                    </div>
                    <div className={styles.second_container}>
                        <div className={styles.linebetween} />
                        <div className={styles.space_between}>
                            <div className={styles.price_text}>1 seat</div>
                            <div className={styles.price}>{rideDetails[0].price}</div>
                        </div>
                    </div>
                    <div className={styles.third_container}>
                        <div className={styles.linebetween} />
                        <button className={styles.approveButton}>Approve</button>
                        <button className={styles.approveButton}>Decline</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
