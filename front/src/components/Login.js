import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";

function Login() {
    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        if (event.target.name === "staffId") {
        setStaffId(event.target.value);
        } else if (event.target.name === "password") {
        setPassword(event.target.value);
        }
        console.log(staffId, password);
    };
    const handleSubmit = (event) => {
        console.log(event);
    }

    return (
        <Container maxWidth="sm">
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <TextField
                type="text"
                name="staffId"
                value={staffId}
                onChange={handleChange}
                id="outlined-basic"
                label="Staff ID"
                variant="outlined"
                sx={{ width: "20rem", my: "0.5rem" }}
            />
            <br />
            <TextField
                id="outlined-basic"
                name="password"
                value={password}
                onChange={handleChange}
                label="Password"
                variant="outlined"
                sx={{ width: "20rem", my: "0.5rem" }}
            />
            <br />
            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "20rem", height: "3.2rem", my: "3rem" }}
            >
                ログイン
            </Button>
            </form>
        </div>
        </Container>
    );
}

export default Login;
