import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";

function UserImages(props) {
  const { userId } = props;

  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
      .then(result => {
        setIsLoading(false);
        setImages(result.data);
        //console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, [userId]);

  return (
    <div>
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
}

export default UserImages;
