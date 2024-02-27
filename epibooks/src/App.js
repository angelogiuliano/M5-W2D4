import { NotFound } from "./Comps/NotFound/NotFound";
import { MainLayout } from "./Comps/MainLayout/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {BookDetails} from './Comps/BookDetails/BookDetails.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/reactepibook" element={<MainLayout />} />
          <Route path='/book/:asin' element={<BookDetails/>} />
          <Route path='*' element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
