import "./index.css";

const Proceed = (props) => {
  const { tickets, checkTickets, ticketType, selectedIds } = props;
  const price =
    ticketType[0] === "P"
      ? tickets * 470
      : ticketType[0] === "E"
      ? tickets * 450
      : tickets * 430;
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
        <button type="button" className="pay">
          Pay-Rs.{price}
        </button>
      )}
    </>
  );
};

export default Proceed;
