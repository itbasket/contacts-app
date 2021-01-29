import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    marginTop: "24px",
  },
});

const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api/?results=200");
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <div>...loading</div>;
  }

  if (contacts.isError) {
    return <div>Some error</div>;
  }

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div>Contacts {contacts.data[0].name.first}</div>
        </Grid>
      </Grid>
    </Container>
  );
};
