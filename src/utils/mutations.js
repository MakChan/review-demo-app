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

export const ADD_REVIEW_WITH_IMAGE = gql`
  mutation addReview(
    $title: String!
    $body: String!
    $username: String!
    $handle: String!
    $fileName: String!
    $size: String!
    $mimeType: String!
  ) {
    createReview(
      data: {
        title: $title
        body: $body
        author: { connect: { username: $username } }
        image: {
          handle: $handle
          fileName: $fileName
          size: $size
          mimeType: $mimeType
          status: PUBLISHED
        }
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

export const UPDATE_REVIEW = gql`
  mutation updateReview($id: ID!, $status: Status!) {
    updateReview(where: { id: $id }, data: { status: $status }) {
      id
      title
      body
      status
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
