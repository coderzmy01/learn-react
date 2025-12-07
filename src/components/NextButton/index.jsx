const NextButton = ({ answer, dispatch, index, numQuestions }) => {
  if (answer === null) return null;
  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
        提交
      </button>
    );
  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
        下一题
      </button>
    );
};

export default NextButton;
