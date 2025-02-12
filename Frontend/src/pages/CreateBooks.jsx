import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory
import Spinner from '../assets/components/Spinner';

function CreateBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Updated from useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newBook = {
        title,
        author,
        publishYear: Number(publishYear), // Ensure it's a number
      };

      await axios.post('http://localhost:5555/books', newBook, {
        headers: { 'Content-Type': 'application/json' }, // Added headers
      });

      setLoading(false);
      navigate('/'); // Updated from history.push('/')
    } catch (error) {
      console.error('Error creating book:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Book'}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateBooks;
