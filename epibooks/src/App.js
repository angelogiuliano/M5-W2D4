import AllTheBooks from "./Comps/AllTheBooks/AllTheBooks";
import MyAlert from "./Comps/MyAlert/MyAlert";
import MyFooter from "./Comps/MyFooter/MyFooter";
import MyNavbar from "./Comps/MyNav/MyNavbar";
import { BookProvider } from "./Comps/ProviderComponent/ProviderComponent";

function App() {
  return (
    <BookProvider>
      <MyNavbar />
      <MyAlert />
      <AllTheBooks />
      <MyFooter />
    </BookProvider>
  );
}

export default App;
