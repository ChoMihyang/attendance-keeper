import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import requestLoginData from "../api/requestLoginData";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledH1 = styled("h1")({
  fontSize: "2.5rem",
  fontWeight: "bold",
  fontFamily: "noto sans jp",
  textAlign: "center",
});

function Login() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "staffId") {
      setStaffId(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await requestLoginData({
      staff_id: staffId,
      password: password,
    });

    if (result) {
      navigate(`/${staffId}`);
    } else {
      alert("IDまたはパスワードをもう一度ご確認ください。");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container style={{ width: "23rem" }}>
      <div>
        <StyledH1>ログイン</StyledH1>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <TextField
            type="text"
            name="staffId"
            value={staffId}
            onChange={handleChange}
            id="outlined-basic"
            label="社員 ID"
            variant="outlined"
            sx={{ width: "20rem", my: "0.5rem" }}
          />
          <br />
          <FormControl sx={{ width: "20rem" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              パスワード
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={password}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <br />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: "20rem", height: "3.2rem", my: "3rem" }}
          >
            ログインへ進む
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
