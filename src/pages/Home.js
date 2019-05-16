import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const REVIEWS_PER_PAGE = 10;

const Home = ({
  data: { loading, error, reviews, reviewsConnection, networkStatus },
  loadMoreReviews
}: HomeProps) => {
  if (error) return <h1>Error fetching reviews!</h1>;
  if (reviews && reviewsConnection) {
    const areMoreReviews = reviews.length < reviewsConnection.aggregate.count;
    return (
      <section>
        <ul className="Home-ul">
          {reviews.map(review => (
            <li className="Home-li" key={`review-${review.id}`}>
              <Link to={`/review/${review.id}`} className="Home-link">
                <div className="Home-placeholder">
                  <img
                    alt={review.title}
                    className="Home-img"
                    src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${
                      review.image.handle
                    }`}
                  />
                </div>
                <h3>{review.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="Home-showMoreWrapper">
          {areMoreReviews ? (
            <button
              className="Home-button"
              disabled={loading}
              onClick={() => loadMoreReviews()}
            >
              {loading ? "Loading..." : "Show More Reviews"}
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
  return <h2>Loading reviews...</h2>;
};
export const reviews = gql`
  query reviews($first: Int!, $skip: Int!) {
    reviews(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
      id
      slug
      title
      dateAndTime
      coverImage {
        handle
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
    loadMoreReviews: () => {
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
