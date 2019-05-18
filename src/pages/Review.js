import React from "react";

import { Query } from "react-apollo";

import { Spinner } from "baseui/spinner";

import { GET_REVIEW } from "../utils/queries";

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
