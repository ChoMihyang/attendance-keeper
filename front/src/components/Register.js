import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

function Register() {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [auth, setAuth] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "staffId") {
      setStaffId(event.target.value);
    } else if (event.target.name === "auth") {
      setAuth(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    requestRegisterData({
      name: name,
      staff_id: staffId,
      auth: auth,
    });
  };

  const StyledH1 = styled("h1")({
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontFamily: "noto sans jp",
    textAlign: "center",
  });

  return (
    <Container style={{ width: "23rem" }}>
      <StyledH1>新規登録</StyledH1>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <TextField
          name="name"
          value={name}
          onChange={handleChange}
          id="outlined-basic"
          label="氏名"
          variant="outlined"
          sx={{ width: "20rem", my: "0.5rem" }}
        />
        <TextField
          name="staffId"
          value={staffId}
          onChange={handleChange}
          id="outlined-basic"
          label="社員 ID"
          variant="outlined"
          sx={{ width: "20rem", my: "0.5rem" }}
        />
        <br />
        <FormControl style={{ textAlign: "left", width: "100%" }}>
          <FormLabel id="demo-radio-buttons-group-label">区分</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="staff"
            name="auth"
            value={auth}
            onChange={handleChange}
            style={{ justifyContent: "space-around" }}
          >
            <FormControlLabel value="staff" control={<Radio />} label="通常" />
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="管理者"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "20rem", height: "3.2rem", marginTop: "3rem" }}
        >
          新規登録を完了する
        </Button>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          size="large"
          sx={{
            width: "20rem",
            height: "3.2rem",
            marginTop: "1rem",
            marginBottom: "3rem",
          }}
        >
          ホーム画面に戻る
        </Button>
      </form>
    </Container>
  );
}

function requestRegisterData(registerData) {
  fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        alert(
          "登録が完了しました。初期パスワードは'000000'です。ログイン画面からログインしパスワードをご変更ください。"
        );
        // TODO: Home画面に戻る
      } else {
        alert("氏名または社員IDをもう一度ご確認ください。");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export default Register;
