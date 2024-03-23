import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import FacebookLogin from "react-facebook-login";
import { NavLink } from "react-router-dom";
import { Videos, ChannelCard } from ".";
import { loginApi, loginFacebookApi } from "../utils/fetchFromAPI";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.querySelector("#email").value;
                let password = document.querySelector("#pass").value;

                let model = { email, password };

                loginApi(model)
                  .then((result) => {
                    localStorage.setItem("LOGIN_USER", result);
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.log(err);
                    alert(err.response.data.message);
                  });
              }}
            >
              Login
            </button>
          </div>
          <NavLink to="/forget" className="text-white">
            Forget Password?
          </NavLink>
          <FacebookLogin
            appId="1545402739589841"
            fields="name,email,picture"
            callback={(result) => {
              let { id, name, email } = result;
              let model = {
                faceAppId: id,
                name,
                email,
              };
              loginFacebookApi(model)
                .then((result) => {
                  localStorage.setItem("LOGIN_USER", result);
                  window.location.reload();
                })
                .catch((err) => console.log(err));
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
