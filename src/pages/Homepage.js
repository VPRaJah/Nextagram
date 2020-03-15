import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserImages from "../containers/UserImages";

import { Button, Container, Row, Col } from "reactstrap";

import "../App.css";

const Homepage = props => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        setIsLoading(false);
        setUsers(result.data);
        //console.log(result.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <div>
      <Container>
        {users.map((user, index) => (
          <Row
            style={{ backgroundColor: "#efefef", margin: "10px" }}
            key={`user_row_${index}`}
          >
            <Col id="col" xs="4">
              <div
                style={{
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                <h4>{user.username}</h4>
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
                <Link to={`/users/${user.id}`}>
                  <Button
                    color="primary"
                    size="sm"
                    style={{ display: "block", margin: "0 auto" }}
                  >
                    See More
                  </Button>{" "}
                </Link>
              </div>
            </Col>
            <Col
              id="col"
              xs="8"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <UserImages userId={user.id} setUsers={setUsers}></UserImages>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Homepage;
