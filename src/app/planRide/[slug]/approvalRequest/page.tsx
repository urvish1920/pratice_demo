import styles from "./approvalRequest.module.css"
import Image from 'next/image';
import profileImage from '../../../assert/avater.png';
import { Button } from "@mui/material";
import icon from '../../../assert/icon.png';

export default function approvalRequest() {
    return(
        <div>
            <h1 className={styles.heading}>Booking Plan</h1>
            <div className={styles.otcenter}>
                <div className={styles.outercontainer}>
                    <div className={styles.first_container}>
                        <div className={styles.linebetween} />
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
                            <div className={styles.price}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
