import Rawter from "./router/Rawter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Rawter />
      </BrowserRouter>
    </div>
  );
}

export default App;
