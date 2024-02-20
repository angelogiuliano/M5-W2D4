import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import MyBookCard from "../MyCard/MyBookCard";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import { BookContext } from "../ProviderComponent/ProviderComponent";

const AllTheBooks = () => {
  const [data, setData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState("");
  const books = useContext(BookContext);

  useEffect(() => {
    setData(books);
    setFilteredBooks(data);
  }, [books, data]);

  const displayFilteredBooks = (bookCards) =>
    bookCards.map((book) => (
      <MyBookCard
        key={book.asin}
        title={book.title}
        price={book.price}
        imgSrc={book.img}
        category={book.category}
        asin={book.asin}
      />
    ));
  return (
    <>
      <Container>
        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}

        <Row>
          {filteredBooks.length > 0 ? (
            displayFilteredBooks(filteredBooks)
          ) : (
            <p className="my-3">No books found, try something else!</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AllTheBooks;
