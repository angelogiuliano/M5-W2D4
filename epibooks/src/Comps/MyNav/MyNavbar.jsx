import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MySearchbar from "../MySearchbar/MySearchbar";
import "./MyNavbar.css";

const MyNavbar = () => {
  // const handleSearch = (value) => {
  //   let result;
  //   if (value === "") {
  //     setFilteredBooks(data);
  //   } else {
  //     result = data.filter((book) =>
  //       book.title.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredBooks(result);
  //   }
  // };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img
          src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
          className="logo"
          alt=""
        />
        <Navbar.Brand href="#home">EpiBOOKS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items-center justify-content-between w-100">
            <Nav.Link href="#">Home</Nav.Link>
            <MySearchbar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
