import React from 'react';
import {
  string, number, arrayOf, shape,
} from 'prop-types';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ data: { book } }) => (
  book
    ? (
      <div className="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <ul className="other-books">
          {book.author.books.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    )
    : null
);

BookDetails.propTypes = {
  data: shape({
    book: shape({
      id: string,
      name: string,
      genre: string,
      author: shape({
        name: string,
        age: number,
        books: arrayOf(shape({
          name: string,
          genre: string,
        })),
      }),
    }),
  }).isRequired,
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => ({
    variables: {
      id: bookId,
    },
  }),
})(BookDetails);
