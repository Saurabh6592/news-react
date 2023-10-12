import './App.css';
import NewsContainer from './content/NewsContainer';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './content/Navbar';

function App(params) {
  return (
    <Router>
      <div className="App">
        <div className="navbar-cont">
          <Navbar />
        </div>
        <Routes >
        <Route path="/" exact element={<NewsContainer category="general" country="in"/>} />
        <Route path="/business" exact element={<NewsContainer category="Business" country="in"/>} />
        <Route path="/entertainment" exact element={<NewsContainer category="Entertainment" country="in"/>} />
        <Route path="/sports" exact element={<NewsContainer category="Sports" country="in"/>} />
        {/* <Route path="/politics" exact element={<NewsContainer category="politics" country="in"/>} /> */}
        <Route path="/technology" exact element={<NewsContainer category="Technology" country="in"/>} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
