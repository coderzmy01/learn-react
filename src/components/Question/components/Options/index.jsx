const Options = ({ options, dispatch }) => {
  return (
    <div className="options">
      {options.map((i) => {
        return (
          <button className="btn btn-option" key={i}>
            {i}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
