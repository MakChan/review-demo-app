import React, { useState } from "react";
import { Mutation } from "react-apollo";

import { Button, KIND } from "baseui/button";

import { UPDATE_REVIEW } from "../utils/mutations";

import Review from "./Review";

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
        <Review review={review}>
          <Button
            kind={KIND.primary}
            type="button"
            disabled={data}
            isLoading={loading && actionType === "PUBLISHED"}
            onClick={() => handleUpdateReview(updateReview, "PUBLISHED")}
          >
            {data && actionType === "PUBLISHED" ? "Approved" : "Approve"}
          </Button>
          <Button
            kind={KIND.secondary}
            type="button"
            disabled={data}
            isLoading={loading && actionType === "ARCHIVED"}
            style={{ marginLeft: "10px" }}
            onClick={() => handleUpdateReview(updateReview, "ARCHIVED")}
          >
            {data && actionType === "ARCHIVED" ? "Rejected" : "Reject"}
          </Button>
        </Review>
      )}
    </Mutation>
  );
}
export default ReviewWithActions;
