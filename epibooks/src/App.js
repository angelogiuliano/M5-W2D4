import AllTheBooks from "./Comps/AllTheBooks/AllTheBooks";
import MyAlert from "./Comps/MyAlert/MyAlert";
import MyFooter from "./Comps/MyFooter/MyFooter";
import MyNavbar from "./Comps/MyNav/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <MyAlert />
      <AllTheBooks />
      <MyFooter />
    </>
  );
}

export default App;
