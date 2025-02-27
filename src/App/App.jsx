import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from '../components/StartPage/StartPage';
import CheckersBoardWrapper from '../components/CheckersBoardWrapper/CheckersBoardWrapper';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game/:gameId" element={<CheckersBoardWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
