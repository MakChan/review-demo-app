import React from "react";

import TimeAgo from "react-timeago";

import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";
import { Card } from "baseui/card";

function Review({ review, children, showStatus }) {
  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            borderColor: "transparent",
            marginBottom: $theme.sizing.scale900,
            borderRadius: $theme.borders.radius200,
            boxShadow: "0 0 40px rgba(0,0,0,.08)",
            opacity: showStatus && review.status === "DRAFT" ? 0.7 : 1
          })
        }
      }}
    >
      <H6 margin="0">
        {review.title} {showStatus && review.status === "DRAFT" && " (Pending)"}
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
      {children}
    </Card>
  );
}
export default Review;
