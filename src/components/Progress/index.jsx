const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        问题：
        {index + 1}/{numQuestions}
      </p>
      <p>
        {points}/{maxPoints}分
      </p>
    </div>
  );
};

export default Progress;
