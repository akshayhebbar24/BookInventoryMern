import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import { Book } from '../models/bookModel.js';

const router = express.Router();

// POST route to add a book
router.post('/', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, and publishYear',
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route to fetch all books
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route to fetch a book by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ message: 'Invalid Book ID' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// PUT route to update a book
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, publishYear } = request.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ message: 'Invalid Book ID' });
    }

    // Check if all required fields are present
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, and publishYear',
      });
    }

    // Update the book and return the updated document
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedBook) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE route to remove a book by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ message: 'Invalid Book ID' });
    }

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
