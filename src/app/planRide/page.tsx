"use client"
import React, { useEffect, useState } from 'react';
import Styles from './planRide.module.css'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormattedDate from '../components/Formate/FormateDate';

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

export default function PlanRide() {
    const [sortBy, setSortBy] = useState('');
    const [allRide, setAllRide] = useState<PublishState[]>([]);
    const router = useRouter();
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    };

    useEffect(() => {
        async function fetchAllData() {
            try {
                const response = await fetch('http://localhost:8000/publish-new-ride/getAllPublish', {
                    credentials: 'include',
                });
                if (response.ok && response.status === 200) {
                    const data :  PublishState[] = await response.json();
                    setAllRide(data)
                } else {
                    toast.error("There is some Problem", { position: 'top-center', hideProgressBar: true });
                }
            } catch (error: any) {
                console.log("PlanRide failed", error.message);
                toast.error(error.message, { position: 'top-center', hideProgressBar: true });
            }
        }
        fetchAllData()
    }, [])
    console.log(allRide)
    return (
        <div className={Styles.planRide}>
            <div className={Styles.text}>
                Sort By:
                <select className={Styles.customselect} value={sortBy} onChange={handleSortChange}>
                    <option value="">Select sort type</option>
                    <option value="option1">price</option>
                    <option value="option2">Passenger</option>
                </select>
            </div>
            {
              
                
                allRide.map((item, index) => {
                    const totalPassenger = item.passenger;
                    
                    // let renderItems = [];
                    // const filledPassenger = 3;
                    // for (let i = 1; i <= totalPassenger; i++) {
                    //     if (i <= filledPassenger) {
                            
                    //         renderItems.push(<div className={`${Styles.passengerCircle} ${Styles.colored}`} />)
                    //     }else{
                    //         renderItems.push(<div className={Styles.passengerCircle} />)
                    //     }
                    // }

                    return (
                        <div className={Styles.otcenter} key={index} >
                        <div className={Styles.outerContainer} onClick={() => {router.push(`/planRide/${item._id}`)}}>
                            <div className={Styles.col80}>
                                <div className={Styles.row}>
                                    <div className={Styles.date}>{<FormattedDate date = {new Date(item.date)}/>}</div>
                                </div>
                                <div className={Styles.row}>
                                <div className={Styles.timecol}>
                                    <div className={Styles.inneruptime}>{item.pickupTime}</div>
                                    <div className={Styles.innertotalhours}>5h</div>
                                    <div className={Styles.innerdowntime}>{item.dropoffTime}</div>
                                </div>
                                <div className={Styles.divider}>
                                    <div className={Styles.box} />
                                    <div className={Styles.line} />
                                    <div className={Styles.box2} />
                                </div>
                                <div className={Styles.loccol}>
                                    <div>
                                        <div className={Styles.innerupplace}>{   item.pickupLocation.split(", ").reverse()[2]}</div>
                                    {/* <div className={Styles.passengerrow}>
                                    {renderItems}  
                                    </div> */}
                                        <div className={Styles.fullAddress}>{item.pickupLocation}</div>
                                    </div>
                                    <div className={Styles.innerdownplace}>{
                                    item.dropoffLocation
                                  }</div>
                                    {/* <div className={Styles.passengerrow}>
                                    {renderItems}
                                    </div> */}
                                    <div className={Styles.fullAddress}>full Address</div>
                                </div>
                                </div>
                                {/* <div className="row">
                                    <div className="img">Image</div>
                                    <div className="img">Yash</div>
                                </div> */}
                            </div>
                            <div className={Styles.col20}> 
                                <div className={Styles.otprice}>{item.price}&#8377;</div>
                            </div>
                        </div>
                        </div>
                    )
                } 
                
                
                )
            }
            <ToastContainer />
        </div>
        
    );
}
