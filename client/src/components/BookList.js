import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = ({ data: { loading, books } }) => {
  const [selectedBookId, selectBook] = useState(null);

  const renderBooks = () => (
    <ul className="book-list">
      {books.map(({ name, id }) => (
        <li
          className="book-list__item"
          key={name}
          onClick={() => selectBook(id)}
        >
          <h3 className="book__name">{name}</h3>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {loading
        ? <h3>Loading Books...</h3>
        : renderBooks()
      }
      <BookDetails bookId={selectedBookId} />
    </>
  );
};

BookList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      genre: PropTypes.string,
      authorId: PropTypes.string,
    })),
  }).isRequired,
};

export default graphql(getBooksQuery)(BookList);
