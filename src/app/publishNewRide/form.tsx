"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState ,useRef , MutableRefObject} from 'react';
import styles from './publishNewRide.module.css';
import { useRouter } from "next/navigation";
interface Autocomplete extends google.maps.places.Autocomplete {}


export interface PublishState {
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

const Form = () => {
    const router = useRouter();
    const [publish, setPublish] = useState<PublishState>({
        pickupLocation: "",
        dropoffLocation: "",
        date: new Date(),
        pickupTime: "",
        dropoffTime: "",
        passenger: 0,
        price: 0,
        byWhichVehicleYouTravelling: "",
        noteMore: ""
    });
    const [step, setStep] = useState(1);
    const [maxDate, setMaxDate] = useState('');

   
    useEffect(() => {
        const dtToday = new Date();
        const month = dtToday.getMonth() + 1;
        const day = dtToday.getDate();
        const year = dtToday.getFullYear();
        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        const formattedDay = day < 10 ? `0${day}` : day.toString();
        const maxDateString = `${year}-${formattedMonth}-${formattedDay}`;
        setMaxDate(maxDateString);
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublish({ ...publish, date: e.target.valueAsDate || new Date() });
    }
    const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passengerValue = parseInt(e.target.value, 10);
        setPublish({ ...publish, passenger: passengerValue });
    };
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const priceValue = parseInt(e.target.value, 10);
        setPublish({ ...publish, price: priceValue });
    };

    const onNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step !== 9)
            setStep(step + 1);
    };
    const publishRide = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step === 9) {
            try {
                const response = await fetch('http://localhost:8000/publish-new-ride/publishnewride', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(publish),
                });
                if (response.ok && response.status === 201) {
                    toast.success('New Ride Publish created successfully!', { position: 'top-center', hideProgressBar: true });
                    router.push("/planRide");
                } else {
                    toast.error(response.statusText, { position: 'top-center', hideProgressBar: true });
                }
            } catch (error: any) {
                toast.error(error.message, { position: 'top-center', hideProgressBar: true });
            }

        }
    }
    const autoCompleteRef = useRef<Autocomplete>();

    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    const options = {
     componentRestrictions: { country: "in" },
     fields: ["address_components", "geometry", "icon", "name"],
     types: ["establishment"]
    };
    useEffect(() => {
   if(!inputRef.current  )
      return;     
      const autocompleteInstance   = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
     );
     console.log(
        "RDgfd"
     )
    const c= autocompleteInstance.addListener('place_changed', (e : any) => {
         console.log(autocompleteInstance,"FDhd");
         
        console.log(autocompleteInstance.getPlace(),"SDfdsg");
         if(inputRef.current?.value)
        setPublish({ ...publish, pickupLocation: inputRef.current?.value })
    });
     console.log(c);
     
    }, []);

    console.log(publish);
    return (
        <>
            <form className={styles.forminput}>
                {step === 1 && (
                    <div>
                        <label className={styles.label}>Pick-up</label>
                        <input
                            className={styles.input}
                            id="pickupLocation"
                            name="pickupLocation"
                            type="text"
                            ref={inputRef}
                            value={publish.pickupLocation}
                            onChange={(e) => {  
                            setPublish({ ...publish, pickupLocation: e.target.value })}}
                            placeholder="Enter pickup Location" />
                    </div>)}
                {step === 2 && (
                    <div>
                        <label className={styles.label}>Drop-off</label>
                        <input
                            className={styles.input}
                            id="dropoffLocation"
                            name="dropoffLocation"
                            type="text"
                            ref={inputRef}
                            value={publish.dropoffLocation}
                            onChange={(e) => setPublish({ ...publish, dropoffLocation: e.target.value })}
                            placeholder="Enter Drop off Location" />
                    </div>)}
                {step === 3 && (
                    <div>
                        <label className={styles.label}>When are you going?</label>
                        <input
                            className={styles.input}
                            id="date"
                            name="date"
                            type='date'
                            value={publish.date.toISOString().slice(0, 10)}
                            min={maxDate}
                            onChange={handleDateChange}
                            placeholder="on which Date" />
                    </div>)}
                {step === 4 && (
                    <div>
                        <label className={styles.label}>At What time will you pick passenger up ?</label>

                        <input
                            className={styles.timeinput}
                            id="pickupTime"
                            name=""
                            type="time"
                            value={publish.pickupTime}
                            onChange={(e) => setPublish({ ...publish, pickupTime: e.target.value })}
                            placeholder="Pick-up Time" />

                    </div>
                )}
                {step === 5 && (
                    <div>
                        <label className={styles.label}>At What time will you Drop passenger off ?</label>
                        <input
                            className={styles.timeinput}
                            id="dropoffTime"
                            name="dropoffTime"
                            type="time"
                            value={publish.dropoffTime}
                            onChange={(e) => setPublish({ ...publish, dropoffTime: e.target.value })}
                            placeholder="Drop-off Time" />

                    </div>
                )}
                {step === 6 && (
                    <div>
                        <label className={styles.label}>How Many Passanger can you take ?</label>
                        <input
                            className={styles.input}
                            id="passenger"
                            name="passenger"
                            type="number"
                            value={publish.passenger}
                            onChange={handlePassengerChange}
                            placeholder=" No Of Passenger" />

                    </div>
                )}
                {step === 7 && (
                    <div>
                        <label className={styles.label}>Price per sete</label>
                        <input
                            className={styles.input}
                            id="price"
                            name="price"
                            type="number"
                            value={publish.price}
                            onChange={handlePriceChange}
                            placeholder=" price" />

                    </div>
                )}
                {step === 8 && (
                    <div>
                        <label className={styles.label}>By which vehicle you're travelling ?</label>
                        <input
                            className={styles.input}
                            id="byWhichVehicleYouTravelling"
                            name="byWhichVehicleYouTravelling"
                            type="text"
                            value={publish.byWhichVehicleYouTravelling}
                            onChange={(e) => setPublish({ ...publish, byWhichVehicleYouTravelling: e.target.value })}
                            placeholder="car name" />

                    </div>
                )}
                {step === 9 && (
                    <div>
                        <label className={styles.label}>Anythings to add about your Ride?</label>
                        <textarea
                            className={styles.input}
                            id="noteMore"
                            name="noteMore"
                            value={publish.noteMore}
                            onChange={(e) => setPublish({ ...publish, noteMore: e.target.value })}
                            placeholder="note more" />
                    </div>
                )}
            </form>
            <div className={styles.Button}>
                {step === 9 ? (
                    <button className={styles.formbutton} onClick={publishRide}>Publish Ride</button>
                ) : (
                    <button className={styles.formbutton} onClick={onNext}>Continue</button>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Form;
