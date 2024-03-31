import './App.css';
import QuizMaker from './pages/quiz-maker'
import {QuizMakerProvider} from './quiz-provider/QuizProvider'

function App() {
  return (
    <div className="App">
      <QuizMakerProvider>
        <QuizMaker />
      </QuizMakerProvider>
   
    </div>
  );
}

export default App;


