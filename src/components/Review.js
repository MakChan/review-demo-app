import React from "react";

import TimeAgo from "react-timeago";

import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";
import { Card, StyledBody } from "baseui/card";

function Review({ review }) {
  return (
    <Card
      // title={`review.title ${review.status === "DRAFT" ? " (Pending)" : null}`}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            marginBottom: $theme.sizing.scale900,
            borderRadius: $theme.borders.radius200,
            boxShadow: $theme.lighting.shadow500,
            opacity: review.status === "DRAFT" ? 0.7 : 1
          })
        }
      }}
    >
      {/* <StyledBody> */}
      <H6 margin="0">
        {review.title} {review.status === "DRAFT" && " (Pending)"}
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
      {/* </StyledBody> */}
    </Card>
  );
}
export default Review;
