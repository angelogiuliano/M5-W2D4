import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import MyCard from "../MyCard/MyCard";
import Row from "react-bootstrap/Row";
import MyAlert from "../MyAlert/MyAlert";
import {
  allBooks,
  getBooks,
  isAllBooksError,
  isAllBooksLoading,
} from "../../reducers/books/booksSlice";
import { Circles } from "react-loader-spinner";

const AllTheBooks = () => {
  const books = useSelector(allBooks);
  const isLoading = useSelector(isAllBooksLoading);
  const isError = useSelector(isAllBooksError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const displayFilteredBooks = (bookCards) =>
    bookCards.map((book) => (
      <MyCard
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
      {isLoading && (
        <div className="d-flex justify-content-center my-5">
          <Circles
            height="50"
            width="50"
            color="#000"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {isError && (
        <MyAlert
          message="Error, please try again later"
          show={false}
          variant="danger"
        />
      )}
      {!isLoading && !isError && (
        <>
          <Container>
            <Row>
              {books.length > 0 ? (
                displayFilteredBooks(books)
              ) : (
                <p className="my-3">No books found, try something else!</p>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default AllTheBooks;
