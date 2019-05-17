import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Spinner } from "baseui/spinner";

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

const Review = props => (
  <Query
    query={GET_REVIEW}
    variables={{ id: props.match.params.id }}
    skip={!props.match.params.id}
  >
    {({ loading, error, data: { review } }) => {
      if (error) return <h1>Error fetching the review!</h1>;
      if (!loading) {
        return (
          <article>
            <h1>{review.title}</h1>
            <div>
              {review.image && (
                <img
                  alt={review.title}
                  className="Home-img"
                  src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${
                    review.image.handle
                  }`}
                />
              )}
            </div>
            <p>{review.body}</p>
          </article>
        );
      }
      return <Spinner />;
    }}
  </Query>
);

export default Review;
