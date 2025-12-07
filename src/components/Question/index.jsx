import Options from './components/Options';
const Question = ({ curQuestion, dispatch }) => {
  return (
    <div className="question">
      <h4>{curQuestion.question}</h4>
      {<Options options={curQuestion.options} dispatch={dispatch} />}
    </div>
  );
};

export default Question;
