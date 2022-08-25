import { Route, Routes } from "react-router-dom";
import { Auth } from "./Components/Auth";
import { Home } from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth signUp={false} />}></Route>
        <Route path="/login" element={<Auth signUp={false} />}></Route>
        <Route path="/signup" element={<Auth signUp={true} />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
