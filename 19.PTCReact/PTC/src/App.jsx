import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/home';
import Login from '../src/pages/login';  // El componente de login que ya tienes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página principal */}
        <Route path="/login" element={<Login />} />  {/* Página de Login */}
      </Routes>
    </Router>
  );
}

export default App;
