import "./App.css";
import Header from "./Header/Header";
import CreateMeme from "./MainContainer/CreateMeme";
import LoginPage from "./LoginContainer/LoginPage";
import { useState } from "react";

function App() {
  const [loginId, setLogin] = useState("Guest");
  const [viewMeme, setViewMeme] = useState(false);
  const login = (view, userName) => {
    setViewMeme(view);
    setLogin(userName);
  };
  const logOut = () => {
    if (viewMeme) {
      setViewMeme(!viewMeme);
      setLogin('Guest');
    }
  }
  return (
    <div className="App">
      <Header loginId={loginId} logOut={ logOut}/>
      {viewMeme ? <CreateMeme /> : <LoginPage login={login} />}
    </div>
  );
}

export default App;