"use client"
import { useEffect, useState} from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSuccess, selectfindRide } from '@/app/GlobalRedux/car-polling/findPlanRideSlice';
import Image from 'next/image';
import profileImage from '../../assert/avater.png';
import icon from '../../assert/icon.png';
import car from '../../assert/car.png';
import styles from './fullDetails.module.css';
import FormattedDate from '@/app/components/Formate/FormateDate';

export default function FullDetailRide({params}:{params:{detailedpage:string}}) {
    const id = params.detailedpage 
    const dispatch = useDispatch();
    const rideDetails = useSelector(selectfindRide);
    console.log(rideDetails)
    const [isPending , setIsPending] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:8000/publish-new-ride/getOne/${id}`, {
                    credentials: 'include'
                }).then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(`Server responded with status ${res.status}`);
                    }
                })
                .then((data) => {
                    dispatch(fetchDataSuccess(data));
                    setIsPending(false);
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
    }, [])

    return (
        <div>  
            {isPending? 'loading...':(
                rideDetails.map((item,index) => (
                    <div key={index}>
                        <h1 className={styles.heading}><FormattedDate date={new Date(item.date)} /></h1>
                        <div className={styles.otcenter}>
                            <div className={styles.outercontainer}>
                                <div className={styles.firstcontainer}>
                                    <div className={styles.date}><FormattedDate date={new Date(item.date)} /></div>
                                    <div className={styles.col}>
                                        <div className={styles.timecol}>
                                            <div className={styles.inneruptime}>{item.pickupTime}</div>
                                            <div className={styles.innerdowntime}>{item.dropoffTime}</div>
                                        </div>
                                        <div className={styles.divider}>
                                            <div className={styles.box} />
                                            <div className={styles.line} />
                                            <div className={styles.box2} />
                                        </div>
                                        <div className={styles.loccol}>
                                            <div className={styles.innerupplace}>{item.pickupLocation}</div>
                                            <div className={styles.innerdownplace}>{item.dropoffLocation}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.secondComponent}>
                                    <div className={styles.linebetween} />
                                    <div className={styles.passanger}>
                                        <div className={styles.priceText}>Total Price for 1 Passenger</div>
                                        <div className={styles.price}>&#8377;{item.price}</div>
                                    </div>
                                </div>
                                <div className={styles.thirdComponent}>
                                    <div className={styles.linebetween} />
                                    <div className={styles.passanger}>
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
                                <div className={styles.forthComponent}>
                                    <div className={styles.linebetween} />
                                    <div className={styles.passanger}>
                                        <div className={styles.carName}>Hyundai Creta</div>
                                        <div className={styles.caricon}>
                                            <Image
                                                src={car}
                                                width={50}
                                                height={50}
                                                alt="car image"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.fifthComponent}>
                                    <div className={styles.linebetween} />
                                    <div className={styles.cotravellarText}>
                                        co-travellers
                                    </div>
                                </div>
                                <div className={styles.fifthComponent}>
                                    <div className={styles.passanger}>
                                        <div className={styles.username}>yash</div>
                                        <div className={styles.coimg}> 
                                            <Image
                                                src={profileImage}
                                                className={styles.avater}
                                                width={40}
                                                height={34}
                                                alt="Picture of the author"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.lastComponent}>
                                    <div className={styles.linebetween} />
                                    <button
                                        style={{
                                            padding: '5px',
                                            width: '150px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            color: 'white',
                                            backgroundColor: 'darkslategrey' ,
                                            border: 'none',
                                            marginLeft: '40%',
                                            marginTop: '10px',
                                        }}
                                        onClick={() => router.push(`/findRide/${id}/summary`)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
