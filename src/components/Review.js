import React from "react";

import TimeAgo from "react-timeago";

import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Caption1 } from "baseui/typography";
import { Card } from "baseui/card";

import Link from "../components/Link";
import Rating from "../components/Rating";

function Review({ review, children, style, showStatus }) {
  const likeCount = review.likedUsers.length;
  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            borderColor: "transparent",
            marginBottom: $theme.sizing.scale900,
            borderTopRightRadius: $theme.borders.radius200,
            borderTopLeftRadius: $theme.borders.radius200,
            borderBottomRightRadius: $theme.borders.radius200,
            borderBottomLeftRadius: $theme.borders.radius200,
            boxShadow: "0 0 40px rgba(0,0,0,.08)",
            opacity: showStatus && review.status === "DRAFT" ? 0.7 : 1,
            ...style
          })
        }
      }}
    >
      <H6 margin="0">
        <Rating>{review.rating}</Rating>
        <Link to={`/review/${review.id}`}>
          {review.title}
          {showStatus && review.status === "DRAFT" && " (Pending)"}
        </Link>
      </H6>
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
      <Caption1 margin="0">
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
      {!showStatus && <Caption1>{review.viewCount} views</Caption1>}
      {children}
    </Card>
  );
}
export default Review;
