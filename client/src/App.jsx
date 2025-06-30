import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Investments from './routes/Investments';
import BudgetCalculator from './routes/BudgetCalculator';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<BudgetCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
