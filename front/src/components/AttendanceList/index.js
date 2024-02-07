import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";

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

function AttendanceList({ attendance }) {
  return (
    <TableContainer sx={{ height: 300 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHead sticky="top">番号</StyledTableHead>
            <StyledTableHead sticky="top">日付</StyledTableHead>
            <StyledTableHead sticky="top">出勤時間</StyledTableHead>
            <StyledTableHead sticky="top">退勤時間</StyledTableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map(
            ({ date, attendance_start_time, attendance_end_time }, index) => (
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
  );
}

export default AttendanceList;
