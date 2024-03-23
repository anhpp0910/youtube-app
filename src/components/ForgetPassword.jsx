import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import FacebookLogin from "react-facebook-login";

import { Videos, ChannelCard } from ".";
import {
  checkCodeApi,
  checkEmailApi,
  loginApi,
  loginFacebookApi,
} from "../utils/fetchFromAPI";

const ForgetPassword = () => {
  const [tour, setTour] = useState(0);
  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        {tour == 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let txtEmail = document.getElementById("email").value;
                  checkEmailApi(txtEmail).then((result) => {
                    if (result) {
                      setTour(1);
                    } else {
                      alert("Email không tồn tại!");
                    }
                  });
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {tour == 1 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <h5>Check your mail to get code</h5>
              <label htmlFor="inputEmail4" className="form-label">
                Enter code
              </label>
              <input className="form-control" id="code" />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let txtCode = document.getElementById("code").value;
                  checkCodeApi(txtCode).then((result) => {
                    if (result) {
                      setTour(2);
                    } else {
                      alert("Code không đúng!");
                    }
                  });
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {tour == 2 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Enter new password
              </label>
              <input type="text" className="form-control" id="password" />
            </div>
            <div className="col-12">
              <button type="button" className="btn btn-primary">
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
