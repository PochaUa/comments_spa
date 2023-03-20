import { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { useAppContext } from "../../context/AppContext";
import { Fetching } from "../../types";
import { getComments } from "../../api/apiGateWay";
import { CommentsList } from "./CommentsList";

export const CommentsTable = () => {
  const { state, actions } = useAppContext();

  useEffect(() => {
    actions.setState(Fetching.FETCHING);
    getComments()
      .then((res) => {
        actions.setComments(res.data);
        actions.setState(Fetching.SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        actions.setState(Fetching.FAILED);
      });
  }, []);

  return (
    <>
      {state.fetching === Fetching.FETCHING ? <LinearProgress /> : null}
      <CommentsList comments={state.comments} />
    </>
  );
};
