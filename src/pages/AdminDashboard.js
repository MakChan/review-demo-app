import React from "react";

import { graphql } from "react-apollo";

import { Spinner } from "baseui/spinner";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { styled } from "baseui";
import { Label2, H6, Paragraph2, Caption2, Label1 } from "baseui/typography";

import Review from "../components/Review";

import { PUBLISHED_REVIEWS, ALL_REVIEWS } from "../utils/queries";

const Section = styled("section", {
  padding: "1rem"
});

const REVIEWS_PER_PAGE = 10;

const Home = ({
  data: { loading, error, reviews, reviewsConnection },
  loadMorePosts,
  user,
  history
}) => {
  if (user.role !== "ADMIN") return history.push("/dashboard");
  if (error) return <h1>Error fetching reviews!</h1>;
  if (reviews && reviewsConnection) {
    const areMorePosts = reviews.length < reviewsConnection.aggregate.count;
    return (
      <Section>
        <Block margin="0px auto" maxWidth="800px">
          <Block display="flex" justifyContent="space-between" margin="20px 0">
            <H6 margin="0">Your Reviews</H6>
            <Button type="button" onClick={() => history.push("/review/add")}>
              Add Review
            </Button>
          </Block>

          {reviews.map(review => (
            <Review review={review} key={`review-${review.id}`} />
          ))}
        </Block>
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
      </Section>
    );
  }
  return <Spinner />;
};

export const reviewsQueryVars = {
  skip: 0,
  first: REVIEWS_PER_PAGE
};

export default graphql(ALL_REVIEWS, {
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
