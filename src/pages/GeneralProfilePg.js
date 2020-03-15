import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingIndicator from "../components/LoadingIndicator";

const GeneralProfilePg = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // performing a GET request
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/${id}`)
      .then(result => {
        setIsLoading(false);
        setUser(result.data);
        //console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
      .then(result => {
        setIsLoading(false);
        setImages(result.data);
        // console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, [id]);

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
      >
        <img
          style={{
            width: "150px",
            margin: "10px",
            borderRadius: "50%",
            marginBottom: "30px"
          }}
          src={user.profileImage}
          alt="Missing"
        />
        <h3
          style={{
            marginLeft: "40px",

            width: "100px"
          }}
        >
          {user.username}
        </h3>
      </div>
      {isLoading ? (
        <LoadingIndicator
          height={150}
          width={150}
          color={`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`}
        />
      ) : (
        images.map((image, index) => {
          return (
            <img
              style={{
                width: "100px",
                height: "100px",
                margin: "10px"
              }}
              key={`user_row_${index}`}
              src={image}
              alt="Missing"
            />
          );
        })
      )}
    </div>
  );
};
export default GeneralProfilePg;
