import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { USER, UPDATE_USER } from "../../gql/users";

import {
  Breadcrumbs,
  Typography,
  Box,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import AddressTable from "../../components/users/AddressTable";

const User = () => {
  const { id } = useParams();
  const result = useQuery(USER, { variables: { id: id } });
  const [showAlert, setShowAlert] = useState({ message: "", isError: false });

  const [editUser] = useMutation(UPDATE_USER, {
    onError: (error) => {
      console.log("error : ", error);
      setShowAlert({ message: "Error on server", isError: true });
      setTimeout(() => {
        setShowAlert({ message: "", isError: false });
      }, 3000);
    },
    onCompleted: () => {
      setShowAlert({ message: "User have been updated.", isError: false });
      setTimeout(() => {
        setShowAlert({ message: "", isError: false });
      }, 3000);
    },
    refetchQueries: [User],
  });

  if (result.loading) {
    return (
      <div>
        <em>Loading...</em>
      </div>
    );
  }
  const user = result.data.users_by_pk;
  return (
    <div>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <span>{id}</span>
        </Breadcrumbs>
      </div>
      <Typography variant="h4" component="h2" sx={{ m: 3 }}>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap row",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            minHeight: "25vh",
          },
        }}
      >
        <Paper elevation={3}>
          <Card>
            <CardHeader>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Product
              </Typography>
            </CardHeader>
            <CardContent sx={{ display: "flex" }}>
              <CardMedia
                sx={{ flex: 1 }}
                component="img"
                height="194"
                image={user.image_url}
                alt="User"
              />
              <Paper
                sx={{
                  flex: 4,
                  mx: 3,
                  py: 5,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <ListItem>
                    <ListItemText primary="ID" secondary={user.id} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Name" secondary={user.username} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address" secondary={user.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Phone" secondary={user.phone} />
                  </ListItem>
                </Box>
                <Box>
                  <ListItem>
                    <ListItemText
                      primary="Created At"
                      secondary={user.created_at}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Updated At"
                      secondary={user.updated_at}
                    />
                  </ListItem>
                </Box>
              </Paper>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              {user.disabled ? (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    editUser({ variables: { id: user.id, disabled: false } })
                  }
                >
                  Enable
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    editUser({ variables: { id: user.id, disabled: true } })
                  }
                >
                  Disable
                </Button>
              )}
            </CardActions>
          </Card>
        </Paper>
        <AddressTable addresses={user.addresses} />
      </Box>
      {showAlert.message && !showAlert.isError && (
        <Alert
          sx={{ position: "fixed", bottom: "1em", right: "1em" }}
          severity="success"
        >
          {showAlert.message}
        </Alert>
      )}
      {showAlert.message && showAlert.isError && (
        <Alert
          sx={{ position: "fixed", bottom: "1em", right: "1em" }}
          severity="warning"
        >
          {showAlert.message}
        </Alert>
      )}
    </div>
  );
};

export default User;
