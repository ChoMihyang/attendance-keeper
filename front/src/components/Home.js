import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AttendanceButton from "./AttendanceButton";
import requestAccount from "../api/requestAccount";
import requestAttendanceOne from "../api/requestAttendanceOne";

function Home() {
  const HOME_TAB = "1";
  const { staff_id } = useParams();
  const [value, setValue] = useState(HOME_TAB);
  const [staff, setStaff] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await requestAccount(staff_id);
      if (!result?.staff) {
        alert("不正なアクセスです。");
        navigate("/login");
        return;
      }
      setStaff(result.staff);
      const data = await requestAttendanceOne(staff_id);
      setAttendance(data);
    }
    fetchData();
  }, [staff_id]);

  return staff ? (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" />
            {staff.auth === "admin" && <Tab label="社員管理" value="2" />}
          </TabList>
        </Box>
        <TabPanel value="1">
          <AttendanceButton todayAttendance={staff.data} />
          {staff.auth === "admin" && (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ width: "10rem", height: "3.2rem", my: "3rem", mr: "1rem" }}
            >
              新規登録
            </Button>
          )}
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{ width: "10rem", height: "3.2rem", my: "3rem" }}
          >
            ログアウト
          </Button>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </div>
  ) : (
    "Loading..."
  );
}

export default Home;
