import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const PostLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <div
        style={{
          marginTop: "5px",
        }}
      >
        Loading...
      </div>
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
};

export default PostLoading;
