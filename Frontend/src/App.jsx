
import CreateBooks from "./pages/CreateBooks"
import Home from "./pages/Home"
import ShowBook from "./pages/ShowBook"
import DeleteBook from "./pages/DeleteBook"

import EditBook from "./pages/EditBook"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
function App() {

  return (
   <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/books/create'element={<CreateBooks/>}/>
    <Route path='/books/details/:id'element={<ShowBook/>}/>
    <Route path='/books/:id'element={<EditBook/>}/>
    <Route path='/books/delete/:id'element={<DeleteBook/>}/>
   </Routes>
  )
}

export default App