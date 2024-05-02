import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NavBar from "./components/NavBar";
import CreatePrompt from "./pages/CreatePrompt";
import ExecutePrompt from "./pages/ExecutePrompt";
import RateResponse from "./pages/RateResponse";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Index />} />
          <Route path="create-prompt" element={<CreatePrompt />} />
          <Route path="execute-prompt" element={<ExecutePrompt />} />
          <Route path="rate-response" element={<RateResponse />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
