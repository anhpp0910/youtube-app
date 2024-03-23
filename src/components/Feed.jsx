import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Videos, Sidebar } from "./";
import {
  getVideoApi,
  getVideoByTypeApi,
  getVideoByPageApi,
} from "../utils/fetchFromAPI";
import { useNavigate, useParams } from "react-router-dom";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();

  let { id: videoTypeId, page } = useParams();

  useEffect(() => {
    if (videoTypeId) {
      getVideoByTypeApi(videoTypeId).then((result) => {
        setVideos(result);
      });
    } else {
      getVideoApi().then((result) => {
        setVideos(result);
      });
    }
  }, [videoTypeId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    page = page ? page : 1;
    getVideoByPageApi(page).then((result) => {
      console.log(result);
      setVideos(result.content);
      setTotalPage(result.totalPage);
    });
  }, [page]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2050 Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
        {[...Array(totalPage)].map((e, index) => {
          return (
            <button
              className="btn btn-danger mx-1"
              onClick={() => {
                navigate(`/${index + 1}`);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </Box>
    </Stack>
  );
};

export default Feed;
