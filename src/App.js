import './App.css';
import QuizMaker from './pages/quiz-maker';
import QuizResult from './pages/quiz-result';
import {QuizMakerProvider} from './quiz-provider/QuizProvider';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizMaker />,
    
  },
  {
    path: "result",
    element: <QuizResult />,
  }
]);

function App() {
  return (
    <div className="App">
      <QuizMakerProvider>
        <RouterProvider router={router} to="/" />
        {/* <QuizMaker /> */}
      </QuizMakerProvider>
   
    </div>
  );
}

export default App;


