import AllTheBooks from "../AllTheBooks/AllTheBooks";
import Welcome from "../Welcome/Welcome";
import MyFooter from "../MyFooter/MyFooter";
import MyNavbar from "../MyNav/MyNavbar";

export const MainLayout = () => {
  return (
    <>
      <MyNavbar />
      <Welcome />
      <AllTheBooks />
      <MyFooter />
    </>
  );
};
