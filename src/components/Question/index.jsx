import Options from './components/Options';
const Question = ({ curQuestion, dispatch, selected }) => {
  return (
    <div className="question">
      <h4>{curQuestion.question}</h4>
      {<Options question={curQuestion} dispatch={dispatch} selected={selected} />}
    </div>
  );
};

export default Question;
