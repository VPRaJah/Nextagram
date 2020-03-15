import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadPage = () => {
  const [addImage, setAddImage] = useState(null);

  const onChangeAddImage = e => {
    const newImage = e.target.files[0];
    setAddImage(newImage);
    console.log(newImage);
  };

  const uploadImage = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", addImage);

    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/images/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      data: formData
    })
      .then(result => {
        //setMyImages(result.data);
        console.log(result.data);
        console.log(addImage);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeAddImage} />
      <button type="submit" onClick={e => uploadImage(e)}>
        Add Pic
      </button>
    </div>
  );
};

export default UploadPage;

//preview image
//URL.createObjectURL(e.target.files[0])
