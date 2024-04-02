"use client";
import styles from './summaryDetails.module.css'
import FormattedDate from '@/app/components/Formate/FormateDate';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectPlanRide } from '@/app/GlobalRedux/car-polling/RideplanSlice';

export default function SummaryFindRide() {
    
    const rideDetails = useSelector(selectPlanRide);
    const router = useRouter();

    return (
        <div>  
         {
            rideDetails.map((item,index) => {
                return(
                    <div key={index}>
                        <h1 className={styles.heading}>Check details and book</h1>
                        <div className={styles.otcenter}>
                        <div className={styles.outercontainer}>
                        <div className={styles.firstcontainer}>
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
                        <div className={styles.secondComponent}>
                            <div className={styles.linebetween} />
                            <div className={styles.priceHeading}>Price Summary</div>
                            <div className={styles.passanger}>
                                <div>
                                     <div className={styles.Summaryprice}>I seat: &#8377;{item.price} </div>
                                     <div className={styles.priceText}>pay in the car </div>
                                </div>
                               <div className={styles.priceMethod}>CASH</div>
                            </div>
                        </div>
                   
                        <div className={styles.lastComponent}>
                            <div className={styles.linebetween} />
                            <button style={{
                    padding: '5px',
                    width: '150px',
                    height: '40px',
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: 'darkslategrey' ,
                    border: 'none',
                    marginLeft: '40%',
                    marginTop: '10px',
                }}  onClick={() => {router.push(`summary/BookingDone`)}}>Book</button>
                        </div>
                       </div>
                    </div>
                </div>
                    
                )
            })
         }
        </div >
    );
}
