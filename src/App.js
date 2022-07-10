import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

// 내가가진 USD -> 몇개살수있는지 만들기
export default App;
