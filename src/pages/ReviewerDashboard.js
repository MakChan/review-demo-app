import React from "react";

import { Query } from "react-apollo";

import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { styled } from "baseui";
import { H5, H6 } from "baseui/typography";

import Review from "../components/Review";
import Loader from "../components/Loader";

import { CURRENT_USER_REVIEWS } from "../utils/queries";
import { REVIEWS_PER_PAGE } from "../utils/constants";

const Section = styled("section", {
  padding: "1rem"
});

const ReviewerDashboard = ({ user, history }) => {
  if (user.role === "ADMIN") history.push("/admin");

  return (
    <Query
      query={CURRENT_USER_REVIEWS}
      variables={{
        username: user.username,
        skip: 0,
        first: REVIEWS_PER_PAGE
      }}
      fetchPolicy="cache-and-network"
    >
      {({
        data: { reviews, reviewsConnection },
        loading,
        error,
        fetchMore
      }) => {
        if (error) return <h1>Error fetching reviews!</h1>;

        if (reviews && reviewsConnection) {
          if (reviewsConnection.aggregate.count === 0)
            return (
              <Block style={{textAlign: "center"}} > 
                <H6 >No reviews yet.</H6>

                <Button
                  type="button"
                  onClick={() => history.push("/review/add")}
                >
                  Add Review
                </Button>
              </Block>
            );
          return (
            <Section>
              <Block margin="0px auto" maxWidth="800px">
                <Block
                  display="flex"
                  justifyContent="space-between"
                  margin="20px 0"
                >
                  <H5 margin="0">Your Reviews</H5>
                  <Button
                    type="button"
                    onClick={() => history.push("/review/add")}
                  >
                    Add Review
                  </Button>
                </Block>

                {reviews.map(review => (
                  <Review
                    review={review}
                    key={`review-${review.id}`}
                    showStatus
                  />
                ))}
              </Block>
              <div style={{ textAlign: "center" }}>
                {reviews.length < reviewsConnection.aggregate.count && (
                  <Button
                    kind={KIND.secondary}
                    type="button"
                    isLoading={loading}
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: reviews.length
                        },
                        updateQuery: (prevResult, { fetchMoreResult }) => {
                          if (!fetchMoreResult) {
                            return prevResult;
                          }
                          return Object.assign({}, prevResult, {
                            reviews: [
                              ...prevResult.reviews,
                              ...fetchMoreResult.reviews
                            ]
                          });
                        }
                      })
                    }
                  >
                    Show More Posts
                  </Button>
                )}
              </div>
            </Section>
          );
        }
        return <Loader />;
      }}
    </Query>
  );
};

export default ReviewerDashboard;
