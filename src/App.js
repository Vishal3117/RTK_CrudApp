import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPanel from './components/NavbarPanel';
import CreatePost from './components/CreatePost';
import AllPost from './components/AllPost';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/allpost" element={<AllPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
