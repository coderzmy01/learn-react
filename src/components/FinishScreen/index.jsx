const FinishScreen = ({ points, maxPoints, highScore }) => {
  const percent = (points / maxPoints) * 100;
  return (
    <>
      <div className="result">
        您获得了{points}分，总分{maxPoints}({Math.ceil(percent)}%)
      </div>
      <div className="highscore">最高分{highScore}</div>
    </>
  );
};

export default FinishScreen;
