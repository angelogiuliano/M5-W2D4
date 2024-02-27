import AllTheBooks from "../AllTheBooks/AllTheBooks";
import MyAlert from "../MyAlert/MyAlert";
import MyFooter from "../MyFooter/MyFooter";
import MyNavbar from "../MyNav/MyNavbar";

export const MainLayout = () => {
  return (
    <>
      <MyNavbar />
      <MyAlert />
      <AllTheBooks />
      <MyFooter />
    </>
  );
};
