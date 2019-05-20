import React, { useEffect } from "react";

import TimeAgo from "react-timeago";

import { Query, Mutation } from "react-apollo";

import { Label2, H5, Paragraph2, Caption1 } from "baseui/typography";
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";

import Loader from "../components/Loader";
import Card from "../components/Card";
import Rating from "../components/Rating";

import { GET_REVIEW } from "../utils/queries";
import { ADD_LIKE, UPDATE_VIEW_COUNT } from "../utils/mutations";

const ReviewWithMutations = ({ review, user, updateViewCount }) => {
  useEffect(() => {
    updateViewCount({
      variables: { reviewId: review.id, viewCount: review.viewCount + 1 }
    });
  }, []);
  const likeCount = review.likedUsers.length;

  return (
    <Card
      style={{
        maxWidth: "750px"
      }}
    >
      <article>
        <H5 margin="0">
        <Rating>{review.rating}</Rating>
          {review.title}
        </H5>
        <Label2 margin="8px 0">
          <Avatar
            name={review.author.username}
            size="scale700"
            src=""
            overrides={{
              Root: {
                style: { marginRight: "10px" }
              }
            }}
          />
          {review.author.username}
        </Label2>
        <Caption1>
          <TimeAgo date={review.createdAt} />
        </Caption1>
        <Paragraph2 margin="8px 0" style={{ whiteSpace: "pre-line" }}>
          {review.body}
        </Paragraph2>{" "}
        {likeCount > 0 && (
          <Caption1>
            {likeCount} {likeCount > 1 ? "people" : "person"} liked this.
          </Caption1>
        )}
        <Caption1>{review.viewCount} views</Caption1>
        <Mutation mutation={ADD_LIKE} notifyOnNetworkStatusChange={true}>
          {(addLike, { loading, error, data }) => (
            <Button
              type="button"
              disabled={data}
              isLoading={loading}
              style={{ marginTop: 10 }}
              onClick={() =>
                addLike({
                  variables: {
                    reviewId: review.id,
                    username: user.username
                  }
                })
              }
            >
              {data ? "Liked" : "Like"}
            </Button>
          )}
        </Mutation>
      </article>
    </Card>
  );
};

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
          <Mutation mutation={UPDATE_VIEW_COUNT}>
            {updateViewCount => (
              <ReviewWithMutations
                updateViewCount={updateViewCount}
                review={review}
                user={props.user}
              />
            )}
          </Mutation>
        );
      }
      return <Loader />;
    }}
  </Query>
);

export default Review;
