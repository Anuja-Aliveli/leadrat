import { useState, useEffect } from "react";
import Seat from "../Seat";
import Proceed from "../Proceed";
import "./index.css";

const SeatingLayout = (props) => {
  const {
    tickets,
    ticketType,
    ticketsCount,
    updateCount,
    selectedIds,
    handleSelectedIds,
  } = props;
  const [seatsArray, setSeatsArray] = useState([]);
  const [checkTickets, setCheckTickets] = useState(false);

  const onCount = (count) => {
    updateCount(count);
  };

  const updateTotalCount = (value) => {
    handleSelectedIds(value);
  };

  const handleCheckTickets = () => {
    setCheckTickets(false);
  };

  const onSeatButton = async (seat, index, rowName) => {
    if (seat.type !== ticketType[0]) {
      alert("Please select correct type of ticket");
      return null;
    }
    let bookArray = [];
    for (let i = 0; i < ticketsCount; i++) {
      let temp = seat.id + i;
      if (temp < 29) {
        bookArray.push(seat.id + i);
      }
    }
    const objBookArray = bookArray.map((eachItem) => ({
      row: rowName[3],
      id: eachItem,
    }));
    updateTotalCount(objBookArray);
    if (ticketsCount > bookArray.length) {
      const count = ticketsCount - bookArray.length;
      onCount(count);
    }
    const updatedRow = seatsArray[index][rowName].map((eachItem) => {
      if (bookArray.includes(eachItem.id) === true) {
        return { ...eachItem, selected: 1 };
      }
      return eachItem;
    });
    const updatedArray = seatsArray.map((eachItem) => {
      if (eachItem[rowName]) {
        return { [rowName]: updatedRow };
      }
      return eachItem;
    });
    setSeatsArray(updatedArray);
    if (selectedIds.length + bookArray.length === tickets) {
      setCheckTickets(true);
    }
  };

  const fetchData = async () => {
    try {
      const url = `https://leadratbackend.onrender.com/seats`;
      const response = await fetch(url);
      if (response.ok === true) {
        const data = await response.json();
        setSeatsArray(data.seats);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Seat
        tickets={tickets}
        ticketType={ticketType}
        seatsArray={seatsArray}
        onSeatButton={onSeatButton}
      />
      <Proceed
        tickets={tickets}
        checkTickets={checkTickets}
        ticketType={ticketType}
        selectedIds={selectedIds}
        handleCheckTickets={handleCheckTickets}
        fetchData={fetchData}
      />
    </>
  );
};

export default SeatingLayout;
