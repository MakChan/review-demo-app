import React from "react";

import TimeAgo from "react-timeago";

import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";

const Block = styled("div", ({ $theme, $status }) => ({
  backgroundColor: $theme.colors.mono200,
  padding: $theme.sizing.scale400,
  marginBottom: $theme.sizing.scale600,
  border: $theme.borders.border400,
  opacity: $status === "DRAFT" ? 0.7 : 1
}));

function Review({ review }) {
  return (
    <Block $status={review.status}>
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
    </Block>
  );
}
export default Review;
