import { useNavigate, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import requestAttendanceOne from "../api/requestAttendanceOne";

function Detail() {
  const [attendance, setAttendance] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const detailStaffId = params.get("staff_id");
  const detailName = params.get("name");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await requestAttendanceOne(detailStaffId);
      setAttendance(data.result);
    }
    fetchData();
  }, []);

  const StyledTableHead = styled(TableCell)({
    fontSize: "1.4rem",
    fontWeight: "bold",
    fontFamily: "noto sans jp",
    textAlign: "center",
  });
  const StyledTableCell = styled(TableCell)({
    fontSize: "1.4rem",
    fontFamily: "noto sans jp",
    textAlign: "center",
  });

  const StyledTitle = styled("div")({
    fontFamily: "noto sans jp",
    fontSize: "1.6rem",
    border: "1px solid #",
    borderRadius: "20px",
    backgroundColor: "#B4D4FF",
    padding: "1rem",
    margin: "2rem",
  });

  return (
    location.state && (
      <div>
        <IconButton
          size="large"
          onClick={() => {
            navigate(`/${location.state.staff_id}?menu=2`);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <StyledTitle>
          <span>{detailName}（{detailStaffId}） さんの勤怠一覧</span>
        </StyledTitle>
        <TableContainer sx={{ height: 650 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableHead>番号</StyledTableHead>
                <StyledTableHead>日付</StyledTableHead>
                <StyledTableHead>出勤時間</StyledTableHead>
                <StyledTableHead>退勤時間</StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map(
                (
                  { date, attendance_start_time, attendance_end_time },
                  index
                ) => (
                  <TableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{date}</StyledTableCell>
                    <StyledTableCell>{attendance_start_time}</StyledTableCell>
                    <StyledTableCell>{attendance_end_time}</StyledTableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
}

export default Detail;
