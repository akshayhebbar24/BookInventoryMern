import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../assets/components/Spinner';

function DeleteBook() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const deleteBook = async () => {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5555/books/${id}`);
        setLoading(false);
        navigate('/'); // Redirect to home or book list page after successful deletion
      } catch (error) {
        console.error('Error deleting book:', error);
        setError('Failed to delete the book.');
        setLoading(false);
      }
    };

    deleteBook();
  }, [id, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-green-500">Book deleted successfully.</div>
      )}
    </div>
  );
}

export default DeleteBook;