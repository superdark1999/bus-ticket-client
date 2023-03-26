import { useUserHook } from "hooks/useUserHook";
import { BrowserRouter } from "react-router-dom";
import Router from "routes";
import "./App.css";

function App() {
  const { loading, email } = useUserHook();
  // console.log("email: ", email);
  // console.log("loading: ", loading);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
