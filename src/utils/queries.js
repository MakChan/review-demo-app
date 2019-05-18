import gql from "graphql-tag";

export const PUBLISHED_REVIEWS = gql`
  query reviews {
    reviews(orderBy: createdAt_DESC, where: { status: PUBLISHED }) {
      id
      title
      body
      createdAt
      status
      image {
        handle
      }
      author {
        username
      }
    }
    reviewsConnection(where: { status: PUBLISHED }) {
      aggregate {
        count
      }
    }
  }
`;

export const ALL_REVIEWS = gql`
  query reviews {
    reviews(orderBy: createdAt_DESC) {
      id
      title
      body
      createdAt
      status
      image {
        handle
      }
      author {
        username
      }
    }
    reviewsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CURRENT_USER_REVIEWS = gql`
  query currentUserReviews($username: String!) {
    reviews(
      orderBy: createdAt_DESC
      where: { author: { username: $username } }
    ) {
      id
      title
      body
      createdAt
      status
      image {
        handle
      }
      author {
        username
      }
    }
    reviewsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USER = gql`
  query CustomUser($username: String!) {
    customUser(where: { username: $username }) {
      id
      username
      password
      type
    }
  }
`;


export const GET_REVIEW = gql`
  query Review($id: ID!) {
    review(where: { id: $id }) {
      id
      title
      body
      createdAt
      image {
        handle
      }
    }
  }
`;
