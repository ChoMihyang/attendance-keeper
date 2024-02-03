import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Link } from 'react-router-dom';


function Home() {
  const [value, setValue] = useState("1");
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  // TODO: ログインユーザーのAuth値を取得する
  const user = {
    name: "John Doe",
    staffId: "123456",
    auth: "admin",
  };

  // TODO: ログアウト時、セッションを終了する
  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" />
            {user.auth === "admin" && <Tab label="社員管理" value="2" />}
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
      <Button
        component={Link} to="/register"
        variant="contained"
        size="large"
        sx={{ width: "10rem", height: "3.2rem", my: "3rem", mr: "1rem" }}
      >
        新規登録
      </Button>
      <Button
        component={Link} to="/login"
        variant="outlined"
        size="large"
        sx={{ width: "10rem", height: "3.2rem", my: "3rem" }}
      >
        ログアウト
      </Button>
    </div>
  );
}

export default Home;
