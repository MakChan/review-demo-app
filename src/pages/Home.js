import React from "react";

import { graphql } from "react-apollo";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { styled } from "baseui";
// import { Label2, H6, Paragraph2, Caption2, Label1 } from "baseui/typography";

import Review from "../components/Review";
import Loader from "../components/Loader";

import { PUBLISHED_REVIEWS } from "../utils/queries";
import { REVIEWS_PER_PAGE } from "../utils/constants";

const Section = styled("section", {
  padding: "1rem"
});

const Home = ({
  data: { loading, error, reviews, reviewsConnection },
  loadMore
}) => {
  if (error) return <h1>Error fetching reviews!</h1>;
  if (reviews && reviewsConnection) {
    const areMorePosts = reviews.length < reviewsConnection.aggregate.count;
    return (
      <Section>
        <Block margin="20px auto" maxWidth="800px">
          {reviews.map(review => (
            <Review review={review} key={`review-${review.id}`} />
          ))}
        </Block>
        <div style={{ textAlign: "center" }}>
          {areMorePosts && (
            <Button
              kind={KIND.secondary}
              type="button"
              isLoading={loading}
              onClick={() => loadMore()}
            >
              Show More Posts
            </Button>
          )}
        </div>
      </Section>
    );
  }
  return <Loader />;
};

export const queryVars = {
  skip: 0,
  first: REVIEWS_PER_PAGE
};

export default graphql(PUBLISHED_REVIEWS, {
  options: {
    variables: queryVars,
    notifyOnNetworkStatusChange: true
  },
  props: ({ data }) => ({
    data,
    loadMore: () => {
      return data.fetchMore({
        variables: {
          skip: data.reviews.length
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prevResult;
          }
          return Object.assign({}, prevResult, {
            reviews: [...prevResult.reviews, ...fetchMoreResult.reviews]
          });
        }
      });
    }
  })
})(Home);
