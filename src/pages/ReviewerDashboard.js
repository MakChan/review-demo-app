import React from "react";

import { Query } from "react-apollo";

import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { styled } from "baseui";
import { H6 } from "baseui/typography";

import Review from "../components/Review";
import Loader from "../components/Loader";

import { CURRENT_USER_REVIEWS } from "../utils/queries";

const Section = styled("section", {
  padding: "1rem"
});

const REVIEWS_PER_PAGE = 10;

const Home = ({ user, history }) => {
  if (user.role === "ADMIN") history.push("/admin");

  // if (reviews && reviewsConnection)
  //   const areMorePosts = reviews.length < reviewsConnection.aggregate.count;
  return (
    <Query
      query={CURRENT_USER_REVIEWS}
      variables={{
        // type: match.params.type.toUpperCase() || "TOP",
        username: user.username,
        offset: 0,
        limit: 10
      }}
      fetchPolicy="cache-and-network"
    >
      {({ data: { reviews }, loading, error, fetchMore }) => {
        if (error) return <h1>Error fetching reviews!</h1>;
        if (loading) return <Loader />;

        return (
          <Section>
            <Block margin="0px auto" maxWidth="800px">
              <Block
                display="flex"
                justifyContent="space-between"
                margin="20px 0"
              >
                <H6 margin="0">Your Reviews</H6>
                <Button
                  type="button"
                  onClick={() => history.push("/review/add")}
                >
                  Add Review
                </Button>
              </Block>

              {reviews.map(review => (
                <Review review={review} key={`review-${review.id}`} />
              ))}
            </Block>
            <div className="Home-showMoreWrapper">
              {/* {areMorePosts ? (
                <button
                  className="Home-button"
                  disabled={loading}
                  // onClick={() => loadMorePosts()}
                >
                  {loading ? "Loading..." : "Show More Posts"}
                </button>
              ) : (
                ""
              )} */}
            </div>
          </Section>
        );
      }}
    </Query>
  );
  // }
};

export const reviewsQueryVars = {
  skip: 0,
  first: REVIEWS_PER_PAGE
};

export default Home;
