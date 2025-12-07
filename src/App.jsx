// src/App.jsx
import { useEffect, useReducer } from 'react';
import Error from './components/Error';
import FinishScreen from './components/FinishScreen';
import Header from './components/Header';
import Loader from './components/Loading';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Question from './components/Question';
import QuizList from './components/QuizList';
import StartContent from './components/StartContent';
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
const App = () => {
  const [{ status, questions, index, answer, points, highScore }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'dataReceived':
          return {
            ...state,
            questions: action.payload,
            status: 'ready',
          };
        case 'dataFailed':
          return {
            ...state,
            status: 'failed',
          };
        case 'start':
          return {
            ...state,
            status: 'active',
          };
        case 'newAnswer': {
          // 1.完成加分动作
          const question = state.questions.at(state.index);
          const points =
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points;
          return {
            ...state,
            answer: action.payload,
            points,
          };
        }
        case 'nextQuestion': {
          return {
            ...state,
            index: state.index + 1,
            answer: null,
          };
        }
        case 'finish': {
          return {
            ...state,
            status: 'finished',
            highScore: state.points > state.highScore ? state.points : state.highScore,
          };
        }
        default:
          throw new Error('Action unknown');
      }
    },
    initialState,
  );
  const currentQuestions = questions.at(index);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((cur, next) => cur + next.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch({ type: 'dataReceived', payload: res });
      })
      .catch((err) => {
        dispatch({ type: 'dataFailed' });
      });
  }, []);
  return (
    <>
      <Header />
      <QuizList>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <Error />}
        {status === 'ready' && <StartContent numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question curQuestion={currentQuestions} dispatch={dispatch} selected={answer} />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen points={points} maxPoints={maxPoints} highScore={highScore} />
        )}
      </QuizList>
    </>
  );
};

export default App;
