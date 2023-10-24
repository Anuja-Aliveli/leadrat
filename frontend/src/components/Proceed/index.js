import "./index.css";

const Proceed = (props) => {
  const {
    tickets,
    checkTickets,
    ticketType,
    selectedIds,
    handleCheckTickets,
    fetchData,
  } = props;
  const price =
    ticketType[0] === "P"
      ? tickets * 470
      : ticketType[0] === "E"
      ? tickets * 450
      : tickets * 430;
  const onPay = async () => {
    const url = `http://localhost:5000/book`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedIds),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      alert("Booked Successfully");
      handleCheckTickets(false);
      fetchData();
    } else {
      alert("Booking Failed");
    }
  };

  return (
    <>
      {checkTickets === false && (
        <div className="options-container">
          <div className="option">
            <div className="box available"></div>
            <p className="text">Available</p>
          </div>
          <div className="option">
            <div className="box selected"></div>
            <p className="text">Selected</p>
          </div>
          <div className="option">
            <div className="box sold"></div>
            <p className="text">Sold</p>
          </div>
          <div className="option">
            <div className="box"></div>
            <p className="text">Social Distancing Seats</p>
          </div>
        </div>
      )}
      {checkTickets === true && (
        <button type="button" className="pay" onClick={onPay}>
          Pay-Rs.{price}
        </button>
      )}
    </>
  );
};

export default Proceed;
