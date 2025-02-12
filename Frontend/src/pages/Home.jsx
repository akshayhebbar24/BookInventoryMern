import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../assets/components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDeleteForever } from "react-icons/md";
import { motion } from "framer-motion";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-200 rounded-lg shadow-lg">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
        <Link
          to="/books/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          <MdOutlineAddBox className="text-3xl" />
          <span className="text-lg">Add Book</span>
        </Link>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full text-gray-700 table-auto border-separate border-spacing-0">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-center font-medium">No</th>
                <th className="px-6 py-4 text-center font-medium">Title</th>
                <th className="px-6 py-4 text-center font-medium max-md:hidden">Author</th>
                <th className="px-6 py-4 text-center font-medium">Publish Year</th>
                <th className="px-6 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <motion.tr
                  key={book._id}
                  className="hover:bg-blue-100 transition duration-200 ease-in-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center max-md:hidden">{book.title}</td>
                  <td className="px-6 py-4 text-center max-md:hidden">{book.author}</td>
                  <td className="px-6 py-4 text-center">{book.publishYear}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-6">
                    <Link
                      to={`/books/details/${book._id}`}
                      className="text-green-600 hover:text-green-800 transition duration-300 ease-in-out"
                    >
                      <BsInfoCircle className="text-2xl" />
                    </Link>
                    <Link
                      to={`/books/${book._id}`}
                      className="text-yellow-600 hover:text-yellow-800 transition duration-300 ease-in-out"
                    >
                      <AiOutlineEdit className="text-2xl" />
                    </Link>
                    <Link
                      to={`/books/delete/${book._id}`}
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                    >
                      <MdOutlineDeleteForever className="text-2xl" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

export default Home;