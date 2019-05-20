import gql from "graphql-tag";

export const ADD_REVIEW = gql`
  mutation addReview(
    $title: String!
    $body: String!
    $rating: Int!
    $username: String!
  ) {
    createReview(
      data: {
        title: $title
        body: $body
        author: { connect: { username: $username } }
        viewCount: 0
        rating: $rating
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

// export const ADD_REVIEW_WITH_IMAGE = gql`
//   mutation addReview(
//     $title: String!
//     $body: String!
//     $username: String!
//     $handle: String!
//     $fileName: String!
//     $size: String!
//     $mimeType: String!
//   ) {
//     createReview(
//       data: {
//         title: $title
//         body: $body
//         author: { connect: { username: $username } }
//         image: {
//           handle: $handle
//           fileName: $fileName
//           size: $size
//           mimeType: $mimeType
//           status: PUBLISHED
//         }
//       }
//     ) {
//       id
//       title
//       body
//       author {
//         username
//       }
//     }
//   }
// `;

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

export const ADD_LIKE = gql`
  mutation addLike($reviewId: ID!, $username: String!) {
    updateReview(
      where: { id: $reviewId }
      data: { likedUsers: { connect: { username: $username } } }
    ) {
      id
      likedUsers {
        username
      }
    }
  }
`;

export const UPDATE_VIEW_COUNT = gql`
  mutation updateViewCount($reviewId: ID!, $viewCount: Int!) {
    updateReview(where: { id: $reviewId }, data: { viewCount: $viewCount }) {
      id
      viewCount
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
