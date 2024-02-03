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

function Login() {
    const [staffId, setStaffId] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        if (event.target.name === "staffId") {
            setStaffId(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        requestLoginData({ staff_id: staffId, password: password });
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
            <FormControl sx={{ width: "20rem" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                Password
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
                ログイン
            </Button>
            </form>
        </div>
        </Container>
    );
}

function requestLoginData(loginData) {
    fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message === "success"){
            console.log("ログインに成功しました");
        }else{
            alert("IDまたはパスワードをもう一度ご確認ください。");
        }
    })
    .catch ((error) => {
        console.error("Error:", error);
    });
}
export default Login;
