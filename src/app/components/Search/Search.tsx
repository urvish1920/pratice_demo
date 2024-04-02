"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './search.css'

interface SearchState {
    from: string;
    to: string;
    date: Date;
    passenger: number;
}

const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState<SearchState>({ from: "", to: "", date: new Date(), passenger: 1 })
    const [maxDate, setMaxDate] = useState('');
    const handleSearchData = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(search)
        router.push("/findRide");
    }

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
        setSearch({ ...search, date: e.target.valueAsDate || new Date() });
    }

    const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({ ...search, passenger: parseInt(e.target.value) || 1 });
    }

    return (
        <div>
            <form>
                <div className="input-group">
                    <input
                        className="inputfield-1"
                        id="from"
                        type="text"
                        value={search.from}
                        onChange={(e) => setSearch({ ...search, from: e.target.value })}
                        placeholder="from" />
                    <input
                        className="inputfield-2"
                        id="to"
                        type="text"
                        value={search.to}
                        onChange={(e) => setSearch({ ...search, to: e.target.value })}
                        placeholder="to" />
                </div>
                <div className="input-group">
                    <input
                    style={{
                        width: '200px',  
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        fontSize: '15px',
                    }}
                        className="inputfield-1"
                        id="date"
                        type="date"
                        value={search.date.toISOString().slice(0, 10)}
                        min={maxDate}
                        onChange={handleDateChange}
                        placeholder="dd-mm-yyyy" />
                    <input
                        className="inputfield-2"
                        id="passenger"
                        type="number"
                        min="1"
                        value={search.passenger}
                        onChange={handlePassengersChange}
                        placeholder="Passenger" />
                    <button onClick={handleSearchData} className="searchButton">Search</button>
                </div>
            </form>
        </div >
    );
};

export default Search;
