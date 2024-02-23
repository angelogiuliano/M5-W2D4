import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MySearchbar from "./MySearchbar";
import "./MyNavbar.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { filterBooks } from "../../reducers/books/booksSlice";
import { getBooks } from "../../reducers/books/booksSlice";

const MyNavbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleInput = (value) => {
    if (value.length > 1) {
      dispatch(filterBooks(value));
    } else {
      dispatch(getBooks());
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100">
      <Container className="mx-0 w-100">
        <img
          src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
          className="logo"
          alt=""
        />
        <Navbar.Brand href="#home">EpiBOOKS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="d-flex align-items-center justify-content-between w-100">
            <Nav.Link href="#">Home</Nav.Link>
            <div className="searchbar d-flex gap-2">
              <MySearchbar onChange={(e) => handleInput(e)} />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
