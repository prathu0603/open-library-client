import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Owner from "./Components/Owner/Owner";
import Mainpage from "./Components/Mainpage/Mainpage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/owner" component={Owner} />
          <Route exact path="/" component={Mainpage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
