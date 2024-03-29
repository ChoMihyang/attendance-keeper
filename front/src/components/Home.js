import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AttendanceButton from "./AttendanceButton";
import requestAccount from "../api/requestAccount";
import requestAttendanceOne from "../api/requestAttendanceOne";
import AttendanceList from "./AttendanceList";
import AttendanceListAll from "./AttendanceList/AttendanceListAll";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

const StyledButtons = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "0.5rem",
});

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menuParam = params.get("menu") || "1";

  const { staff_id } = useParams();
  const [value, setValue] = useState(menuParam);
  const [staff, setStaff] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();

  const handleChange = (_, newValue) => {
    setValue(newValue);
    navigate(`/${staff_id}?menu=${newValue}`);
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
            <Tab label="ホーム" value="1" />
            {staff.auth === "admin" && <Tab label="勤怠管理" value="2" />}
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
              sx={{ width: "10rem", height: "3.2rem" }}
            >
              ログアウト
            </Button>
          </StyledButtons>
          {staff.data && (
            <AttendanceButton staffId={staff_id} todayAttendance={staff.data} />
          )}
          {attendance && <AttendanceList attendance={attendance} />}
        </TabPanel>
        <TabPanel value="2">
          <StyledButtons>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ width: "10rem", height: "3.2rem" }}
            >
              ログアウト
            </Button>
          </StyledButtons>
          <AttendanceListAll />
        </TabPanel>
      </TabContext>
    </div>
  ) : (
    "Loading..."
  );
}

export default Home;
