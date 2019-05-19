import React from "react";
import { Link } from "react-router-dom";

import { Mutation } from "react-apollo";

import TimeAgo from "react-timeago";

import { Button, KIND } from "baseui/button";
import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";

import { UPDATE_REVIEW } from "../utils/mutations";

const Li = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.mono200,
  padding: $theme.sizing.scale400,
  marginBottom: $theme.sizing.scale600,
  border: $theme.borders.border400
}));


function ReviewWithActions({ review }) {
  return (
    <Mutation mutation={UPDATE_REVIEW}>
      {updateReview => (
        <Li>
          <H6 margin="0">
            <Link to={`/review/${review.id}`}>{review.title}</Link>
          </H6>
          <Label2 margin="8px 0">
            <Avatar
              name={review.author.username}
              size="scale800"
              src=""
              overrides={{
                Root: {
                  style: { marginRight: "10px" }
                }
              }}
            />
            {review.author.username}
          </Label2>
          <Paragraph1 margin="0">
            <TimeAgo date={review.createdAt} />
          </Paragraph1>
          <Paragraph2 margin="8px 0">{review.body}</Paragraph2>
          <Button
            kind={KIND.primary}
            type="button"
            onClick={() =>
              updateReview({
                variables: { id: review.id, status: "PUBLISHED" }
              })
            }
          >
            Approve
          </Button>
          <Button
            kind={KIND.secondary}
            type="button"
            onClick={() =>
              updateReview({
                variables: { id: review.id, status: "ARCHIVED" }
              })
            }
          >
            Reject
          </Button>
        </Li>
      )}
    </Mutation>
  );
}
export default ReviewWithActions;
