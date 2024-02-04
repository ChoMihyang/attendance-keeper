import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AttendanceButton from "./AttendanceButton";
import requestAccount from "../api/requestAccount";
import requestAttendanceOne from "../api/requestAttendanceOne";
import AttendanceList from "./AttendanceList";
import { styled } from "@mui/system";

const StyledButtons = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

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
      setAttendance(data.result);
    }
    fetchData();
  }, [staff_id]);

  return staff ? (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Home" value="1" />
            {staff.auth === "admin" && <Tab label="社員管理" value="2" />}
          </TabList>
        </Box>
        <TabPanel value="1">
          <StyledButtons>
            {staff.auth === "admin" && (
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  width: "10rem",
                  height: "3.2rem",
                  mr: "1rem",
                }}
              >
                新規登録
              </Button>
            )}
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ width: "10rem", height: "3.2rem"}}
            >
              ログアウト
            </Button>
          </StyledButtons>
          {staff.data && (
            <AttendanceButton staffId={staff_id} todayAttendance={staff.data} />
          )}
          {attendance && <AttendanceList attendance={attendance} />}
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </div>
  ) : (
    "Loading..."
  );
}

export default Home;
