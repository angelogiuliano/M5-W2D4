import React, { useState, useEffect } from "react";
import axios from "axios";
import FormTextExample from "../MySearchbar/MySearchbar";
import Container from "react-bootstrap/Container";
import MyBookCard from "../MyCard/MyBookCard";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import { Circles } from "react-loader-spinner";

const MyMain = () => {
  const url = "https://striveschool-api.herokuapp.com/books";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k";
  
  const [data, setData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${key}` },
        });
        const data = await response.data;
        setData(data);
        setFilteredBooks(data);
      } catch (err) {
        setError("Please try again.");
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (value) => {
    let result;
    if (value === "") {
      setFilteredBooks(data);
    } else {
      result = data.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(result);
    }
  };

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

        <FormTextExample onChange={handleSearch} />

        <Row>
          {filteredBooks.length > 0 ? (
            displayFilteredBooks(filteredBooks)
          ) : (
            <div className="d-flex justify-content-center my-5">
              <Circles
                height="80"
                width="80"
                color="#000"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default MyMain;
