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
  fontSize: "1.2rem",
  fontWeight: "bold",
});
const StyledTableCell = styled(TableCell)({
  fontSize: "1.2rem",
});

function AttendanceList({ attendance }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableHead>日付</StyledTableHead>
            <StyledTableHead>出勤時間</StyledTableHead>
            <StyledTableHead>退勤時間</StyledTableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map((row) => (
            <TableRow key={row.date}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.attendance_start_time}</StyledTableCell>
              <StyledTableCell>{row.attendance_end_time}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceList;
