import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Workouts from "./Workouts";
import { VisbilityProvider } from "./Contexts/VisibilityContext";
import { DataProvider } from "./Contexts/DataContext";

function App() {
  return (
    <VisbilityProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </Router>
      </DataProvider>
    </VisbilityProvider>
  );
}

export default App;
