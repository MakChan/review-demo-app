import React from "react";

import { graphql } from "react-apollo";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { styled } from "baseui";
import {  H6} from "baseui/typography";

import ReviewWithActions from "../components/ReviewWithActions";
import Loader from "../components/Loader";

import { PENDING_REVIEWS } from "../utils/queries";

const Section = styled("section", {
  padding: "1rem"
});

const REVIEWS_PER_PAGE = 2;

const AdminDashboard = ({
  data: { loading, error, reviews, reviewsConnection },
  loadMore,
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
            <H6 margin="0">Pending Reviews</H6>
          </Block>

          {reviews.map(review => (
            <ReviewWithActions review={review} key={`review-${review.id}`} />
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

export default graphql(PENDING_REVIEWS, {
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
})(AdminDashboard);
