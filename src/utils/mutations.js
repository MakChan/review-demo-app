import gql from "graphql-tag";

export const ADD_REVIEW = gql`
  mutation addReview($title: String!, $body: String!, $username: String!) {
    createReview(
      data: {
        title: $title
        body: $body
        author: { connect: { username: $username } }
      }
    ) {
      id
      title
      body
      author {
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!, $name: String!) {
    createCustomUser(
      data: {
        username: $username
        name: $name
        password: $password
        type: AUTHOR
      }
    ) {
      id
      username
      name
    }
  }
`;
