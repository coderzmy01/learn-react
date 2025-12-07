// src/App.jsx
import { useEffect, useReducer } from 'react';
import Error from './components/Error';
import Header from './components/Header';
import Loader from './components/Loading';
import Question from './components/Question';
import QuizList from './components/QuizList';
import StartContent from './components/StartContent';
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
};
const App = () => {
  const [{ status, questions, index }, dispatch] = useReducer((state, action) => {
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
      case 'newAnswer':
        return {
          ...state,
          answer: action.payload,
        };
      default:
        throw new Error('Action unknown');
    }
  }, initialState);
  const currentQuestions = questions.at(index);
  const numQuestions = questions.length;

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
        {status === 'active' && <Question curQuestion={currentQuestions} dispatch={dispatch} />}
      </QuizList>
    </>
  );
};

export default App;
