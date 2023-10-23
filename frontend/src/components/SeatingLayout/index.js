import { useState, useEffect } from "react";
import Seat from '../Seat';
import "./index.css";

const SeatingLayout = (props) => {
  const { tickets, ticketType } = props;
  const [seatsArray, setSeatsArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/seats`;
        const response = await fetch(url);
        if(response.ok === true) {
            const data = await response.json();
            setSeatsArray(data.seats);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
      <Seat tickets={tickets} ticketType={ticketType} seatsArray={seatsArray} />
  )
};

export default SeatingLayout;
