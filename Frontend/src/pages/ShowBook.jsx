import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../assets/components/Backbutton';
import Spinner from '../assets/components/Spinner';

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 p-4">
          <div className="my-4">
            <div>
              <span className="text-xl mr-4 text-gray-500">Id:</span>
              {book._id}
            </div>
            <div>
              <span className="text-xl mr-4 text-gray-500">Title:</span>
              {book.title}
            </div>
            <div>
              <span className="text-xl mr-4 text-gray-500">Author:</span>
              {book.author}
            </div>
            <div>
              <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
              {book.publishYear}
            </div>
            <div>
              <span className="text-xl mr-4 text-gray-500">Create Time:</span>
              {formatDate(book.createTime)}
            </div>
            <div>
              <span className="text-xl mr-4 text-gray-500">Last Update Time:</span>
              {formatDate(book.lastUpdateTime)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;