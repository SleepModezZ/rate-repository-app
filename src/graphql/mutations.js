 import { gql } from '@apollo/client';

export const  AUTHENTICATE = gql`
  mutation auth(
    $username: String!
    $password: String!
    ) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $year: Int!
    $author: String!
    $genres: [String]!
  ) {
    addBook(title: $title, published: $year, author: $author, genres: $genres) {
      title
      published
      genres
    }
  }
`

// other mutations...