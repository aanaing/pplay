import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import "../../style/App.css";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Breadcrumbs,
  ListItemButton,
  ListItemText,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Modal,
} from "@mui/material";

import { useLazyQuery } from "@apollo/client";
import { ALL_VIDEOS, DELETE_VIDEOS } from "../../gql/video";
import { DELETE_IMAGE } from "../../gql/misc";
import { useQuery, useMutation } from "@apollo/client";
import { minHeight } from "@mui/system";
import CreateVideo from "../../components/video/CreateVideo";
import UpdateVideo from "../../components/video/UpdateVideo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleD = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  border: "2px solid #fff",
  boxShadow: 24,
  color: "white",
  px: 4,
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [homeOpen, setHomeOpen] = useState(true);
  const [gymOpen, setGymOpen] = useState(true);
  const [video, setVideo] = useState("");
  const [showAlert, setShowAlert] = useState({ message: "", isError: false });
  const [removeOpen, setRemoveOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [loadVideo, result] = useLazyQuery(ALL_VIDEOS);
  //console.log(result);

  const data = [
    { label: "All" },
    { label: "Chest" },
    { label: "Back" },
    { label: "Leg" },
    { label: "Triceps" },
  ];
  const gym = [
    { label: "All" },
    { label: "Chest" },
    { label: "Back" },
    { label: "Leg" },
    { label: "Triceps" },
  ];

  // ----------- Start search and get all video ------------------
  const handleSearch = (e) => {
    //setSearch(document.getElementById("search-by-title").value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    loadVideo({ variables: { search: `%${search}%` } });
  }, [loadVideo, search]);

  useEffect(() => {
    if (result.data) {
      //console.log(result);
      setVideo(result.data.video_list);
    }
  }, [result]);
  // ----------- End search and get all video ------------------

  // ----------Start Delete video ------------------
  const [deleteVideo] = useMutation(DELETE_VIDEOS, {
    onError: (error) => {
      console.log("error : ", error);
    },
    onCompleted: () => {
      setShowAlert({ message: `Videos have been removed.`, isError: false });
      setTimeout(() => {
        setShowAlert({ message: "", isError: false });
      }, 3000);
    },
  });

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    onError: (error) => {
      console.log("error : ", error);
    },
  });

  const handleRemoveOpen = (row) => {
    setVideo(row);
    setRemoveOpen(true);
  };
  const handleRemoveClose = () => {
    result.refetch();
    setRemoveOpen(false);
  };

  const handleRemove = () => {
    if (!video) {
      return;
    }
    let image_url = video.video_url;
    console.log(image_url);
    let image_name = image_url.substring(
      image_url.lastIndexOf("/") + 1,
      image_url.length
    );
    deleteVideo({ variables: { id: video.id } });
    deleteImage({ variables: { image_name: image_name } });
  };
  //---------------------- End Delete Video -----------------

  //----------------- Start Add Video -------------------
  // const videoAlert = (message, isError = false) => {
  //   setShowAlert({ message: message, isError: isError });
  //   setTimeout(() => {
  //     setShowAlert({ message: "", isError: false });
  //   }, 3000);
  // };

  // const handleCreateOpen = () => setCreateOpen(true);
  // const handleCreateClose = () => {
  //   result.refetch();
  //   setCreateOpen(false);
  // };
  //------------------ End Add Video --------------------

  //------------------Start Update Video -------------------
  // const handleUpdateOpen = (row) => {
  //   updateOpen(row);
  //   setUpdateOpen(true);
  // };
  // const handleUpdateClose = () => {
  //   result.refetch();
  //   setUpdateOpen(false);
  // };

  if (!video) {
    return (
      <div>
        <em>Loading....</em>
      </div>
    );
  }
  return (
    <div>
      <div className="align">
        {/* dashboard */}
        <div>
          <Breadcrumbs aria-label="breadcrumb" fontWeight="bold" color="#fff">
            <Link to="/" className="dashboard">
              Dashboard
            </Link>
            <span>Video</span>
          </Breadcrumbs>
        </div>
        {/* search */}
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 350,
            }}
          >
            {/* Search Box */}

            <InputBase
              id="search-by-title"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search By Video Title"
              type="search"
              value={search}
              onChange={handleSearch}
            />
            {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton> */}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="warning"
              sx={{ p: "10px" }}
              aria-label="directions"
              value={search}
              //onClick={handleSearch}
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div className="exercise">
        <Box>
          <ListItemButton
            alignItems="flex-start"
            onClick={() => setHomeOpen(!homeOpen)}
            sx={{
              alignItems: "center",
              textAlign: "center",
              bgcolor: "#ed8618",
              borderRadius: 2,
              height: 50,
              px: 3,
              pt: 2,
              pb: homeOpen ? 0 : 2.5,
              //"& svg": { opacity: 1 },
            }}
          >
            <ListItemText sx={{ color: "white" }} primary="HOME EXERCISE" />
            <KeyboardArrowDown
              sx={{
                mr: -1,
                opacity: 0,
                transform: homeOpen ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
                color: "white",
              }}
            />
          </ListItemButton>
          {homeOpen &&
            data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{
                  color: "white",
                }}
              >
                <ListItemText
                  sx={{
                    color: "white",
                  }}
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: 1,
                  }}
                />
              </ListItemButton>
            ))}
        </Box>
        <Box>
          <ListItemButton
            onClick={() => setGymOpen(!gymOpen)}
            sx={{
              alignItems: "center",
              textAlign: "center",
              px: 3,
              height: 50,
              pt: 2,
              bgcolor: "#ed8618",
              borderRadius: 2,
              pb: gymOpen ? 0 : 2.5,
              "& svg": { opacity: 1 },
              // "&:hover, &:focus": { color: open ? "red" : "blue" },
            }}
          >
            <ListItemText sx={{ color: "white" }} primary="GYM EXERCISE" />
            <KeyboardArrowDown
              sx={{
                mr: -1,
                opacity: 0,
                transform: gymOpen ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
                color: "white",
              }}
            />
          </ListItemButton>
          {gymOpen &&
            gym.map((item) => (
              <ListItemButton
              // key={item.label}
              // sx={{
              //   color: "white",
              // }}
              >
                <ListItemText
                  sx={{ color: "white" }}
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: 1,
                  }}
                />
              </ListItemButton>
            ))}
        </Box>
        <Box>
          <ListItemButton
            alignItems="flex-start"
            sx={{
              bgcolor: "#ed8618",
              width: 180,
              borderRadius: 2,
              borderRadius: 3,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ListItemText sx={{ color: "white" }} primary="ZUMBA" />
          </ListItemButton>
        </Box>
      </div>

      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap row",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            minHeight: "25vh",
          },
          m: "1.5rem",
        }}
      >
        {Array.isArray(video)
          ? video.map((row, index) => (
              <Card
                sx={{
                  maxWidth: 300,
                  bgcolor: "#262626",
                  borderRadius: 3,
                }}
                key={index}
              >
                <CardMedia
                  component="img"
                  height="50"
                  image={row.video_url}
                  alt="dog"
                />
                <CardContent sx={{ color: "white" }}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    Title
                  </Typography>

                  <Typography variant="body2" component="div">
                    {row.video_title}
                  </Typography>
                  <Typography variant="body2" component="a">
                    {row.package_type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleRemoveOpen(row)}
                    size="small"
                    color="error"
                  >
                    Remove
                  </Button>
                  <Button
                    //onClick={handleUpdateOpen}
                    size="small"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    //onClick={handleCreateOpen}
                    size="small"
                    color="secondary"
                  >
                    Add
                  </Button>
                </CardActions>
              </Card>
            ))
          : null}
      </Box>

      {/* Remove Video */}
      <Modal
        keepMounted
        open={removeOpen}
        onClose={handleRemoveClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box style={styleD}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Remove video
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            variant="body"
            sx={{ mt: 2 }}
          >
            Are you sure want to remove?
          </Typography>
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button color="primary" onClick={handleRemoveClose}>
              Cancel
            </Button>
            <Button color="error" onClick={handleRemove}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Video
      // <div style={(minHeight = "auto")}>
      //   <Modal
      //     keepMounted
      //     open={createOpen}
      //     onClose={handleCreateClose}
      //     aria-labelledby="keep-mounted-modal-title"
      //     aria-descripedby="keep-mounted-modal-description"
      //   >
      //     <Box style={style}>
      //       <CreateVideo
      //         videoAlert={videoAlert}
      //         handleClose={handleCreateClose}
      //       />
      //     </Box>
      //   </Modal>
      // </div>

      {/* Update Video */}
      {/* <div style={(minHeight = "auto")}>
        <Modal
          keepMounted
          open={updateOpen}
          onClose={handleUpdateClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-descripedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <UpdateVideo
              videoAlert={videoAlert}
              handleClose={handleUpdateClose}
              video={video}
            />
          </Box>
        </Modal>
      </div> */}
    </div>
  );
};
export default Index;
