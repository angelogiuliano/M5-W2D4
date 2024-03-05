import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://striveschool-api.herokuapp.com/books";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k";

const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

export const getBooks = createAsyncThunk("books/GETBooks", async () => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${key}` },
    });
    return await response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    filterBooks: (state, action) => {
      const lowerCasePayload = action.payload.toLowerCase();
      state.books = state.books.filter((book) => {
        return book.title.toLowerCase().includes(lowerCasePayload);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong, please try again later.";
      });
  },
});

export const allBooks = (state) => state.booksData.books;
export const isAllBooksLoading = (state) => state.booksData.isLoading;
export const isAllBooksError = (state) => state.booksData.error;
export const { filterBooks } = booksSlice.actions;

export default booksSlice.reducer;
