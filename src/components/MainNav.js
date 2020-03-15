import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import LoadingIndicator from "../components/LoadingIndicator";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Input,
  Form,
  Label,
  FormFeedback,
  FormGroup,
  FormText
} from "reactstrap";

function MainNav(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, changeModalState] = useState(false);
  const [isLogin, changeForm] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(false);

  const [usernameCheck, setUsernameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [CpasswordCheck, setCPasswordCheck] = useState(false);

  const { loggedIn, setLoggedIn } = props;
  const [myUserID, setMyUserID] = useState("");
  let history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const buttonLogin = () => {
    changeModalState(!modalOpen);
    changeForm(true);
  };
  const buttonSignup = () => {
    changeModalState(!modalOpen);
    changeForm(false);
  };
  const buttonLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    toast.warning("Logged out successfully!", {
      position: "top-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
  const toLogin = () => {
    changeForm(true);
  };
  const toSignUp = () => {
    changeForm(false);
  };
  const closeModal = () => {
    changeModalState(false);
  };

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setNameInput(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
      handleUsernameValid(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const handleEmailInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newEmail = e.target.value;
    setEmailInput(newEmail);

    const newDelay = setTimeout(() => {
      handleEmailValid(newEmail);
    }, 500);

    setDelay(newDelay);
  };

  const handlePasswordInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newPassword = e.target.value;
    setPasswordInput(newPassword);

    const newDelay = setTimeout(() => {
      handlePasswordValid(newPassword);
    }, 500);

    setDelay(newDelay);
  };

  const handleCPasswordInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newCPassword = e.target.value;
    SetConfirmPassword(newCPassword);

    const newDelay = setTimeout(() => {
      handleCPasswordValid(newCPassword);
    }, 500);

    setDelay(newDelay);
  };

  const handleLogin = event => {
    event.preventDefault();
    if (nameInput.length > 0 && passwordInput.length > 0) {
      console.log("A name was submitted: " + nameInput);
      console.log("A password was submitted: " + passwordInput);
      //alert("Success!");

      axios({
        method: "POST",
        url: "https://insta.nextacademy.com/api/v1/login",
        data: {
          username: nameInput,
          password: passwordInput
        }
      })
        .then(result => {
          console.log(result);
          localStorage.setItem("jwt", result.data.auth_token);
          localStorage.setItem("myID", result.data.user.id);
          localStorage.setItem("myProfPic", result.data.user.profile_picture);
          toast.success("Logged in successfully!", {
            position: "top-left",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          setLoggedIn(true);
          history.push("../pages/MyProfilePage.js");
          closeModal();
        })
        .catch(error => {
          console.error(error.response); // so that we know what went wrong if the request failed
        });
    } else {
      alert("Please fill in all the boxes.");
    }
  };

  const handleSignup = event => {
    event.preventDefault();
    if (
      nameInput.length > 0 &&
      emailInput.length > 0 &&
      passwordInput.length > 0 &&
      passwordInput == confirmPassword
    ) {
      console.log("A name was submitted: " + nameInput);
      console.log("A email was submitted: " + emailInput);
      console.log("A password was submitted: " + passwordInput);
      //alert("Success!");

      axios({
        method: "POST",
        url: "https://insta.nextacademy.com/api/v1/users/",
        data: {
          username: nameInput,
          email: emailInput,
          password: passwordInput
        }
      })
        .then(result => {
          console.log(result);
          toast.success("Signed up successfully!", {
            position: "top-left",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          toLogin();
        })
        .catch(error => {
          console.error(error.response); // so that we know what went wrong if the request failed
        });
    } else if (passwordInput != confirmPassword) {
      alert("Password entered do not match. Please reenter password!");
    } else {
      alert("Please fill in all the boxes.");
    }
  };

  const DisableButton = () => {
    if (nameInput == "" || passwordInput == "" || emailInput == "") {
      return true;
    } else {
      return false;
    }
  };

  const handleUsernameValid = newUsername => {
    if (!newUsername.length) {
      return setUsernameCheck(false);
    }
    if (newUsername.length < 6) {
      return setUsernameCheck(false);
    }
    return setUsernameCheck(true);
  };

  const getFormFeedbackUserN = () => {
    if (!nameInput.length) {
      return null;
    }
    if (nameInput.length < 6) {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Must be at least 6 characters
        </FormFeedback>
      );
    }
    if (usernameValid) {
      return (
        <FormFeedback valid style={{ marginLeft: "50px", color: "lightgreen" }}>
          Sweet! That name is available
        </FormFeedback>
      );
    } else {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Sorry! Username is taken
        </FormFeedback>
      );
    }
  };

  const handlePasswordValid = newPassword => {
    if (!newPassword.length) {
      return setPasswordCheck(false);
    }
    if (newPassword.length < 8) {
      return setPasswordCheck(false);
    }
    return setPasswordCheck(true);
  };

  const getFormFeedbackUserP = () => {
    if (!passwordInput.length) {
      return null;
    }
    if (passwordCheck) {
      return (
        <FormFeedback valid style={{ marginLeft: "50px", color: "lightgreen" }}>
          Password accepted.
        </FormFeedback>
      );
    } else {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Must be at least 8 characters
        </FormFeedback>
      );
    }
  };

  const handleCPasswordValid = newCPassword => {
    if (!newCPassword.length) {
      return setCPasswordCheck(false);
    }
    if (newCPassword != passwordInput) {
      return setCPasswordCheck(false);
    }
    if (newCPassword.length < 8) {
      return setCPasswordCheck(false);
    }
    return setCPasswordCheck(true);
  };

  const getFormFeedbackUserCP = () => {
    if (!confirmPassword.length) {
      return null;
    }
    if (CpasswordCheck && confirmPassword == passwordInput) {
      return (
        <FormFeedback valid style={{ marginLeft: "50px", color: "lightgreen" }}>
          Password matches.
        </FormFeedback>
      );
    } else if (confirmPassword != passwordInput) {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Password does not match.
        </FormFeedback>
      );
    } else if (confirmPassword.length < 8) {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Must be at least 8 characters
        </FormFeedback>
      );
    }
  };

  const handleEmailValid = newEmail => {
    if (!newEmail.length) {
      return setEmailCheck(false);
    }
    if (newEmail.length < 6) {
      return setEmailCheck(false);
    }
    return setEmailCheck(true);
  };

  const getFormFeedbackUserE = () => {
    if (!emailInput.length) {
      return null;
    }
    if (emailInput.length < 6) {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Please enter valid E-mail address.
        </FormFeedback>
      );
    }
    if (emailCheck) {
      return (
        <FormFeedback valid style={{ marginLeft: "50px", color: "lightgreen" }}>
          Sweet! This E-mail is usable.
        </FormFeedback>
      );
    } else {
      return (
        <FormFeedback invalid style={{ marginLeft: "50px", color: "red" }}>
          Sorry! This E-mail is taken
        </FormFeedback>
      );
    }
  };

  const ModalStyle = {
    display: modalOpen ? "block" : "none",
    boxSizing: "content-box",
    width: "70vh",
    padding: "5px",
    position: "absolute",
    top: "20%",
    left: "30%",
    backgroundColor: "black",
    color: "white",
    zIndex: 9
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/Homepage">
          <NavbarBrand>NEXTAGRAM</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-2" navbar>
            <NavItem style={{ display: "flex" }}>
              <Input type="text" />
              <Button outline color="primary">
                Search
              </Button>{" "}
            </NavItem>

            <NavLink>Users</NavLink>
            <div style={{ display: "flex", alignItems: "center" }}>
              {!loggedIn ? (
                <NavItem style={{ display: "flex" }}>
                  <NavLink onClick={buttonLogin}>Login</NavLink>
                  <NavLink onClick={buttonSignup}>Sign Up</NavLink>
                </NavItem>
              ) : (
                <Link to="/Homepage">
                  <NavItem
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid black",
                      height: "32px"
                    }}
                  >
                    <img
                      src="https://image.shutterstock.com/image-photo/portrait-amazement-siberian-husky-dog-600w-599221973.jpg"
                      //src={localStorage.getItem("myProfPic")}
                      width="30px"
                      height="30px"
                    />
                    <NavLink onClick={buttonLogout}>Logout</NavLink>
                  </NavItem>
                </Link>
              )}
            </div>

            <div style={ModalStyle}>
              {isLogin ? (
                <Form>
                  <Button
                    size="sm"
                    style={{
                      boxSizing: "content-box",
                      position: "absolute",
                      left: "93%",
                      backgroundColor: "red",
                      color: "white"
                    }}
                    onClick={closeModal}
                  >
                    X
                  </Button>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      User Name:
                    </Label>
                    <Input
                      valid={usernameCheck}
                      invalid={!usernameCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="text"
                      onChange={handleUsernameInput}
                      value={nameInput}
                    />
                    {getFormFeedbackUserN()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a username between 6 and 20 characters
                    </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      Password:
                    </Label>
                    <Input
                      valid={passwordCheck}
                      invalid={!passwordCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="password"
                      onChange={handlePasswordInput}
                      value={passwordInput}
                    />
                    {getFormFeedbackUserP()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a password at least 8 characters
                    </FormText>
                  </FormGroup>

                  <Label
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontWeight: "bold"
                    }}
                  >
                    <Button
                      color="success"
                      style={{ marginTop: "10px" }}
                      type="submit"
                      onClick={e => handleLogin(e)}
                      disabled={DisableButton()}
                    >
                      Login
                    </Button>

                    <Button
                      color="warning"
                      style={{ marginTop: "10px" }}
                      type="submit"
                      onClick={toSignUp}
                    >
                      Switch to Sign Up
                    </Button>
                  </Label>
                </Form>
              ) : (
                <Form>
                  <Button
                    size="sm"
                    style={{
                      boxSizing: "content-box",
                      position: "absolute",
                      left: "93%",
                      backgroundColor: "red",
                      color: "white"
                    }}
                    onClick={closeModal}
                  >
                    X
                  </Button>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      User Name:
                    </Label>
                    <Input
                      valid={usernameCheck}
                      invalid={!usernameCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="text"
                      onChange={handleUsernameInput}
                      value={nameInput}
                    />
                    {getFormFeedbackUserN()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a username between 6 and 20 characters
                    </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      E-mail:
                    </Label>
                    <Input
                      valid={emailCheck}
                      invalid={!emailCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="email"
                      onChange={handleEmailInput}
                      value={emailInput}
                    />
                    {getFormFeedbackUserE()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a valid E-mail
                    </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      Password:
                    </Label>
                    <Input
                      valid={passwordCheck}
                      invalid={!passwordCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="password"
                      onChange={handlePasswordInput}
                      value={passwordInput}
                    />
                    {getFormFeedbackUserP()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a password at least 8 characters
                    </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      style={{
                        margin: "50px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        alignItems: "center",
                        fontWeight: "bold"
                      }}
                    >
                      Confirm Password:
                    </Label>
                    <Input
                      valid={CpasswordCheck}
                      invalid={!CpasswordCheck}
                      style={{ marginLeft: "50px", width: "370px" }}
                      type="password"
                      onChange={handleCPasswordInput}
                      value={confirmPassword}
                    />
                    {getFormFeedbackUserCP()}
                    <FormText style={{ marginLeft: "50px" }}>
                      Enter a password at least 8 characters
                    </FormText>
                  </FormGroup>
                  <Label
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontWeight: "bold"
                    }}
                  >
                    <Button
                      color="success"
                      style={{ marginTop: "10px" }}
                      type="submit"
                      onClick={toLogin}
                    >
                      Switch to Login
                    </Button>

                    <Button
                      color="warning"
                      style={{ marginTop: "10px" }}
                      type="submit"
                      onClick={e => handleSignup(e)}
                      disabled={DisableButton()}
                    >
                      Sign Up
                    </Button>
                  </Label>
                </Form>
              )}
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainNav;
