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

function Detail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const staffIdParam = params.get("staff_id");
  const navigate = useNavigate();

  const StyledTableHead = styled(TableCell)({
    fontSize: "1.2rem",
    fontWeight: "bold",
  });
  const StyledTableCell = styled(TableCell)({
    fontSize: "1.2rem",
  });
  const StyledSpan = styled("span")({
    fontSize: "1.5rem",
    marginRight: "1.5rem",
    marginBottom: "3rem",
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
        <div>
          <StyledSpan>社員 ID:{staffIdParam}</StyledSpan>
          <StyledSpan>氏名</StyledSpan>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHead>番号</StyledTableHead>
                <StyledTableHead>日付</StyledTableHead>
                <StyledTableHead>退勤時間</StyledTableHead>
                <StyledTableHead>退勤時間</StyledTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {data.map((row, index) => (
              <TableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell>{row.attendance_start_time}</StyledTableCell>
                <StyledTableCell>{row.attendance_end_time}</StyledTableCell>
              </TableRow>
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
}

export default Detail;
