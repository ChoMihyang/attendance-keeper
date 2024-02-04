import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import requestAttendanceAll from "../../api/requestAttendanceAll";
import { useEffect, useState } from "react";

const StyledTableHead = styled(TableCell)({
  fontSize: "1.2rem",
  fontWeight: "bold",
});
const StyledTableCell = styled(TableCell)({
  fontSize: "1.2rem",
});

function AttendanceListAll() {
  const [attendanceAll, setAttendanceAll] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await requestAttendanceAll();
      setAttendanceAll(data.result);
    }
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableHead>Staff ID</StyledTableHead>
            <StyledTableHead>氏名</StyledTableHead>
            <StyledTableHead>退勤時間</StyledTableHead>
            <StyledTableHead>退勤時間</StyledTableHead>
            <StyledTableHead></StyledTableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceAll.map((row) => (
            <TableRow key={row.date}>
              <StyledTableCell>{row.staff_id}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.attendance_start_time}</StyledTableCell>
              <StyledTableCell>{row.attendance_end_time}</StyledTableCell>
              <StyledTableCell>Detail ▶</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceListAll;
