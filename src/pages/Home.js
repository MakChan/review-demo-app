import React from "react";
import { Link, Redirect } from "react-router-dom";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Spinner } from "baseui/spinner";

const REVIEWS_PER_PAGE = 10;

const Home = ({
  data: { loading, error, reviews, reviewsConnection, networkStatus },
  loadMorePosts,
  user
}) => {
  if (user.role === "ADMIN") return <Redirect to={{ pathname: "/admin" }} />;
  if (error) return <h1>Error fetching reviews!</h1>;
  if (reviews && reviewsConnection) {
    const areMorePosts = reviews.length < reviewsConnection.aggregate.count;
    return (
      <section>
        <Link to="/review/add">Add Review</Link>
        <ul className="Home-ul">
          {reviews.map(review => (
            <li className="Home-li" key={`review-${review.id}`}>
              <Link to={`/review/${review.id}`} className="Home-link">
                <div className="Home-placeholder">
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
                <h3>{review.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="Home-showMoreWrapper">
          {areMorePosts ? (
            <button
              className="Home-button"
              disabled={loading}
              onClick={() => loadMorePosts()}
            >
              {loading ? "Loading..." : "Show More Posts"}
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
  return <Spinner />;
};
export const reviews = gql`
  query reviews {
    reviews(orderBy: createdAt_DESC) {
      id
      title
      body
      createdAt
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
export const reviewsQueryVars = {
  skip: 0,
  first: REVIEWS_PER_PAGE
};

export default graphql(reviews, {
  options: {
    variables: reviewsQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.reviews.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            reviews: [...previousResult.reviews, ...fetchMoreResult.reviews]
          });
        }
      });
    }
  })
})(Home);
