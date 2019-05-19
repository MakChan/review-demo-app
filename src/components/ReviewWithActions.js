import React, { useState } from "react";
import { Mutation } from "react-apollo";

import TimeAgo from "react-timeago";

import { Button, KIND } from "baseui/button";
import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";

import { UPDATE_REVIEW } from "../utils/mutations";

const BLock = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.mono200,
  padding: $theme.sizing.scale400,
  marginBottom: $theme.sizing.scale600,
  border: $theme.borders.border400
}));

function ReviewWithActions({ review }) {
  const [actionType, setAction] = useState("");

  const handleUpdateReview = (updateReview, type) => {
    setAction(type);
    updateReview({
      variables: { id: review.id, status: type }
    });
  };
  return (
    <Mutation mutation={UPDATE_REVIEW} notifyOnNetworkStatusChange={true}>
      {(updateReview, { loading, error, data }) => (
        <BLock>
          <H6 margin="0">{review.title}</H6>
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
            disabled={data}
            isLoading={loading && actionType == "PUBLISHED"}
            onClick={() => handleUpdateReview(updateReview, "PUBLISHED")}
          >
            {data && actionType == "PUBLISHED" ? "Approved" : "Approve"}
          </Button>
          <Button
            kind={KIND.secondary}
            type="button"
            disabled={data}
            isLoading={loading && actionType == "ARCHIVED"}
            style={{ marginLeft: "10px" }}
            onClick={() => handleUpdateReview(updateReview, "ARCHIVED")}
          >
            {data && actionType == "ARCHIVED" ? "Rejected" : "Reject"}
          </Button>
        </BLock>
      )}
    </Mutation>
  );
}
export default ReviewWithActions;
