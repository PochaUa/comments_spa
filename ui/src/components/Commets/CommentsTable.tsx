import { useEffect } from "react";
import { useCommentsContext } from "../../context/commentsContext";
import { Fetching } from "../../types";
import { getComments } from "../../api/apiGateWay";

export const CommentsTable = () => {
  const { state, actions } = useCommentsContext();
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
      {state.comments.map((comment) => (
        <code key={Math.random()}>{JSON.stringify(comment, null, 2)}</code>
      ))}
    </>
  );
};
