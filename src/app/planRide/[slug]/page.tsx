"use client";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import styles from './moreDetails.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect} from 'react';
import FormattedDate from '@/app/components/Formate/FormateDate';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSuccess, selectPlanRide } from '@/app/GlobalRedux/car-polling/planRideDetialsSlice';
import Image from 'next/image';
import profileImage from '../../../app/assert/avater.png';

export interface PublishState {
    _id:string;
    user_id:string;
    pickupLocation: string;
    dropoffLocation: string;
    date: Date;
    pickupTime: string;
    dropoffTime: string;
    passenger: number;
    price: number;
    byWhichVehicleYouTravelling: string;
    noteMore: string;
}

export default function planRideDetails({params}:{params:{slug:string}}) {
    const id = params.slug
    console.log(id)
    const router = useRouter();
    const dispatch = useDispatch();
    const rideDetails = useSelector(selectPlanRide);
    console.log(rideDetails)
    
    useEffect(() => {
        async function fetchAllData() {
            try {
                const response = await fetch(`http://localhost:8000/publish-new-ride/getOne/${id}`, {
                    credentials: 'include',
                });
                if (response.ok && response.status === 200) {
                    const data = await response.json();
                    // setPlanRide([...planRide,data])
                    dispatch(fetchDataSuccess(data));
                } else {
                    toast.error("Any Problem", { position: 'top-center', hideProgressBar: true });
                }
            } catch (error: any) {
                console.log("PlanRide failed", error.message);
                toast.error(error.message, { position: 'top-center', hideProgressBar: true });
            }
        }
        fetchAllData()

    }, [])

    return (
        <div>  
            <h1 className={styles.heading}>Ride plan</h1>
         {
            rideDetails.map((item,index) => {
                return(
                    <div className={styles.otcenter} key={index}>
                    <div className={styles.outercontainer}>
                        <div className={styles.request}> 
                            <div className={styles.col}>
                                <div className={styles.notification}><NotificationsNoneRoundedIcon /></div>
                                <div>
                                    <div className={styles.bookingRequest}>
                                        New Booking Request
                                    </div>
                                    <button className={styles.replay} onClick={() => router.push(`[slug]/approvalRequest`)}>Replay to keval</button>
                                </div>
                            </div>   
                        </div>
                        <div className={styles.middlecontainer}>
                            <div className={styles.linebetween} />
                            <div className={styles.date}>{<FormattedDate date = {new Date(item.date)}/>}</div>
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
                        <div className={styles.lastComponent}>
                            <div className={styles.linebetween} />
                            <div className={styles.co_travellers}>co-travellers</div>
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
                        </div>
                       </div>
                    </div>
                )
            })
         }
            <ToastContainer />
        </div >
    );
}
