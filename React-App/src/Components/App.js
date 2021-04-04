import Home from "./HomeComponent";
import SignInPage from "./SignInPage";
import ForgotPassword from "./ForgotPassword";
import About from "./About";
import { useAuth} from "../Context/AuthContext";
import {Switch, Route, Redirect} from "react-router-dom";
const App = () => {
  const {currentUser} = useAuth();

  return (
    <div className="App h-screen">
      <Switch>
    <Route path="/login" >{currentUser ? <Redirect to="/" /> : <SignInPage/>}</Route>
    <Route path="/forgotpassword" exact={true}> {currentUser ? <Redirect to="/" /> : <ForgotPassword/>}</Route>

    <Route path="/about" component={About}/>
    <Route path="/">
        {currentUser ?  <Home/>:<Redirect to="/login" />}
      </Route>
</Switch>
    </div>
  );
}

export default App;
