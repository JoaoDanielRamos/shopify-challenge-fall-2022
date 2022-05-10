// * Modules
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// * Pages
import Home from './pages/Home/Home';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
