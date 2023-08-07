import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/styles/Index.css';
import Exchange from './pages/Exchange';
import Invoice from './pages/Invoice';
import Confirmation from './pages/Confirmation';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Exchange />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;