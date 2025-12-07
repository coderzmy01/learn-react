const Options = ({ question, dispatch, selected }) => {
  const isSelected = selected !== null;
  return (
    <div className="options">
      {question.options.map((i, idx) => {
        return (
          <button
            className={`btn btn-option ${selected === idx ? 'answer' : ''} ${
              isSelected && (idx === question.correctOption ? 'correct' : 'wrong')
            }`}
            key={i}
            disabled={isSelected}
            onClick={() => {
              dispatch({ type: 'newAnswer', payload: idx });
            }}
          >
            {i}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
