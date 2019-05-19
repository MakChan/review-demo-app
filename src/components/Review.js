import React from "react";
import { Link } from "react-router-dom";

import TimeAgo from "react-timeago";

import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import { Label2, H6, Paragraph2, Paragraph1 } from "baseui/typography";

const Li = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.mono200,
  padding: $theme.sizing.scale400,
  marginBottom: $theme.sizing.scale600,
  border: $theme.borders.border400
  //   boxShadow: $theme.lighting.shadow400,
  //   display: "flex",
  //   alignItems: "center"
}));

function Review({ review }) {
  return (
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
    </Li>
  );
}
export default Review;
