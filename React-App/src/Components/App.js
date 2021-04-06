import Home from "./HomeComponent";
import SignInPage from "./SignInPage";
import ForgotPassword from "./ForgotPassword";
import About from "./About";
import { useAuth} from "../Context/AuthContext";
import {Switch, Route, Redirect} from "react-router-dom";
const App = () => {
  const {currentUser} = useAuth();

  return (
    <div className="App h-screen w-screen overflow-x-hidden">
      <Switch>
    <Route path="/login" >{currentUser ? <Redirect to="/home" /> : <SignInPage/>}</Route>
    <Route path="/forgotpassword" exact={true}> {currentUser ? <Redirect to="/home" /> : <ForgotPassword/>}</Route>

    <Route path="/about" component={About}/>
    <Route path="/">
        {currentUser ?  <Home/>:<Redirect to="/login" />}
      </Route>
</Switch>
    </div>
  );
}

export default App;
