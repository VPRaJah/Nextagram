import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ImageUpload from "./ImageUpload";

const MyProfilePage = () => {
  const [myUser, setMyUser] = useState({});
  const [myImages, setMyImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/users/me",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(result => {
        setMyUser(result.data);
        console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(result => {
        setMyImages(result.data);
        console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src="https://image.shutterstock.com/image-photo/portrait-amazement-siberian-husky-dog-600w-599221973.jpg"
        width="150px"
        height="150px"
      />
      <h1> Welcome </h1>
      <h2> {myUser.username} </h2>
      <ImageUpload></ImageUpload>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {myImages.map((image, index) => {
          return (
            <img
              src={image}
              width="100px"
              height="100px"
              style={{ margin: "10px", padding: "5px" }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MyProfilePage;
