import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creiamo un context che conterrà i nostri libri e lo inizializziamo come vogliamo (in questo caso array)
const BookContext = createContext([]);

const BookProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const url = "https://striveschool-api.herokuapp.com/books";
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k";

  const getBooks = async () => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${key}` },
      });
      const data = await response.data;
      setData(data)
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <BookContext.Provider value={data}>
        {children}
    </BookContext.Provider>
  )
};

export {BookContext, BookProvider}
