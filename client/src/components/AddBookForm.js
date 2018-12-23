import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBookForm = ({
  addBook,
  getAuthorsQuery: { loading, authors },
}) => {
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthorId, setBookAuthorId] = useState('');

  const sendForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: bookAuthorId,
      },
      refetchQueries: [{
        query: getBooksQuery,
      }],
    });
  };

  return (
    <form className="form" onSubmit={sendForm}>
      <div className="form__field">
        <label className="form__label">Book name:</label>
        <input
          className="form__input"
          type="text"
          value={bookName}
          onChange={e => setBookName(e.target.value)}
        />
      </div>

      <div className="form__field">
        <label className="form__label">Genre:</label>
        <input
          className="form__input"
          type="text"
          value={bookGenre}
          onChange={e => setBookGenre(e.target.value)}
        />
      </div>

      <div className="form__field">
        <label className="form__label">Author:</label>
        <select
          className="form__select"
          onChange={e => setBookAuthorId(e.target.value)}
        >
          <option value={null}>{loading ? 'Loading Authors' : 'Select Author'}</option>
          {!loading && (
            authors.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))
          )}
        </select>
      </div>

      <button className="form__submit" type="submit">+</button>

    </form>
  );
};

AddBookForm.propTypes = {
  addBook: PropTypes.func.isRequired,
  getAuthorsQuery: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    authors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBook' }),
)(AddBookForm);
