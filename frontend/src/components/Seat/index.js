import "./index.css";

const Seat = (props) => {
  const { tickets, ticketType, seatsArray, onSeatButton } = props;
  const array = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  const onSeatBtn = (seat, index, rowName) => {
    onSeatButton(seat, index, rowName);
  };

  const renderRow = (rowArray) => {
    const indexOfRow = array.indexOf(rowArray[0].row);
    return (
      <div className="row-container" key={rowArray[0].row}>
        <p className="letter">{rowArray[0].row}</p>
        {rowArray.map((eachSeat) => (
          <button
            type="button"
            key={eachSeat.id}
            disabled={eachSeat.sold === 1}
            className={`seat ${
              eachSeat.visibility === 1
                ? "hidden"
                : eachSeat.sold === 1
                ? "booked"
                : eachSeat.selected === 1
                ? "selected"
                : ""
            }`}
            onClick={() => onSeatBtn(eachSeat, indexOfRow, "row" + rowArray[0].row)}
          >
            {eachSeat.id}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="chart-container">
      <h4 className="price-container">Premium-Rs. 470.00</h4>
      {seatsArray.map((eachRow, index) => {
        if (index === 3 || index === 7) {
          const typeText =
            index === 3 ? "Executive-Rs. 450.00" : "Normal-Rs. 430.00";
          return (
            <>
              <div key={index}>{renderRow(eachRow["row" + array[index]])}</div>
              <h4 className="price-container">{typeText}</h4>
            </>
          );
        }
        return (
          <div key={index}>{renderRow(eachRow["row" + array[index]])}</div>
        );
      })}
    </div>
  );
};

export default Seat;
