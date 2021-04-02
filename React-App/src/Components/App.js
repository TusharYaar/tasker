import Home from "./HomeComponent";
import SignInPage from "./SignInPage";
import {AuthProvider, useAuth} from "../Context/AuthContext";
const App = () => {
  const {currentUser} = useAuth();

  return (
    <div className="App h-screen">
      {console.log(currentUser)}
      {currentUser ? <Home /> : <SignInPage/>}
    </div>
  );
}

export default App;
