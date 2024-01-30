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

function Register() {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [auth, setAuth] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStaffIdChange = (event) => {
    setStaffId(event.target.value);
  };

  const handleAuthChange = (event) => {
    setAuth(event.target.value);
  };

  const handleSubmit = () => {
    console.log(name, staffId, auth);
  };

  return (
    <Container maxWidth="sm">
      <div>
        <h1>Register</h1>
        <TextField
          onChange={handleNameChange}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ width: "20rem", my: "0.5rem" }}
        />
        <br />
        <TextField
          onChange={handleStaffIdChange}
          id="outlined-basic"
          label="Staff ID"
          variant="outlined"
          sx={{ width: "20rem", my: "0.5rem" }}
        />
        <br />
        <FormControl sx={{ my: "0.5rem" }}>
          <FormLabel id="demo-radio-buttons-group-label">区分</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="通常"
            name="radio-buttons-group"
            onChange={handleAuthChange}
          >
            <FormControlLabel
              value="通常"
              control={<Radio />}
              label="staff"
              sx={{ width: "10rem" }}
            />
            <FormControlLabel
              value="管理者"
              control={<Radio />}
              label="admin"
            />
          </RadioGroup>
        </FormControl>
        <br />
        {/* TODO: Link to /login */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            sx={{ width: "20rem", height: "3.2rem", my: "3rem" }}
          >
            新規登録を完了する
          </Button>
      </div>
    </Container>
  );
}

export default Register;
