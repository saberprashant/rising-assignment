import { Routes, Route } from 'react-router-dom';
import Home from  './components/Home.tsx'
import Quiz from  './components/Quiz.tsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/quiz' element={<Quiz/>} />
      </Routes>
    </div>
  );
}

export default App;
