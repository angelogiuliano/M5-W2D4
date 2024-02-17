import AlertDismissible from "./Comps/MyAlert/MyAlert";
import MyFooter from "./Comps/MyFooter/MyFooter";
import MyMain from "./Comps/MyMain/MyMain";
import MyNavbar from "./Comps/MyNav/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <AlertDismissible />
      <MyMain />
      <MyFooter />
    </>
  );
}

export default App;
