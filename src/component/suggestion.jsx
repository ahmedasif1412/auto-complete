const Suggestion = ({ data, handleOnClick }) => {
  return (
    <ul className="main-list">
      {data && data.length
        ? data.map((item, index) => (
            <li onClick={handleOnClick} className="list-suggestion" key={index}>
              {item}
            </li>
          ))
        : null}
    </ul>
  );
};

export default Suggestion;
