import React from "react";
import { useState } from "react";
import { thunkAddBooking } from "../../../../store/booking";
import { useDispatch } from "react-redux";

import '../SpotShow.css';

function FindAllMethods(obj) {
    return Object.getOwnPropertyNames(obj).filter(function (property) {
        return typeof obj[property] == "function";
    });
}

function ReserveForm({ handleSetNumDays, numDays, user, spotId }) {
    
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleCheckIn = (e) => {
        console.log("CHECK IN DATE: ", e.target.value)
        setStartDate(e.target.value);
        return;
    }

    const handleCheckOut = (e) => {
        console.log("CHECK OUT DATE: ", e.target.value)
        setEndDate(e.target.value);
        return;
    }

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffStartEnd = end.getTime() - start.getTime();

        return diffStartEnd / (1000 * 3600 * 24);
    };


    if (startDate && endDate) {
        const numOfDays = calculateDays(startDate, endDate);
        handleSetNumDays(numOfDays);
    };

    const handleSubmitDates = (e) => {
        e.preventDefault();

        const newBooking = JSON.stringify({
            startDate: startDate,
            endDate: endDate
        });

        const createBooking = dispatch(thunkAddBooking(spotId, newBooking))
                                .then((res) => {
                                    if (res.statusCode === 400) {
                                        return alert(`${res.message}`)
                                    }
                                    
                                    

                                    return alert(`Listing uccessfully booked!`)
                                })

    }

    return (
        <form className="reserve-form"
              onSubmit={handleSubmitDates}
        >

            <div className="reserve-form-inputs">
                <div className="reserve-form-date">
                    <label for="checkin">Check in:</label>

                    <input type="date" id="checkin" name="book-checkin"
                        onChange={handleCheckIn}
                    >
                            
                    </input>
                </div>

                <div className="reserve-form-date">
                    <label for="checkout">Check out:</label>

                    <input type="date" id="checkout" name="book-checkout"
                        onChange={handleCheckOut}
                    >
                            
                    </input>
                </div>
            </div>

            <button className="reserve-form-submit-btn"
                    disabled={numDays === 0 || !user}
                    type="submit"
            >
                Reserve
            </button>
        </form>
    )
}

export default ReserveForm;


