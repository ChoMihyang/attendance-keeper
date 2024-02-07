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
import { Link, useParams, useNavigate } from "react-router-dom";
import Detail from "../Detail";
import requestAccount from "../../api/requestAccount";

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
  fontSize: "1.7rem",
  border: "1px solid #",
  borderRadius: "20px",
  backgroundColor: "#B4D4FF",
  padding: "1rem",
  marginBottom: "2rem",
});

function AttendanceListAll() {
  const [attendance, setAttendance] = useState([]);
  const [detail, setDetail] = useState(false);
  const { staff_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await requestAccount(staff_id);
      if (!result?.staff) {
        alert("不正なアクセスです。");
        navigate("/login");

        window.location.reload();
        return;
      }

      if (result.staff.auth !== "admin") {
        alert("管理者以外はアクセスできません。");
        navigate(`/${staff_id}?menu=1`);

        window.location.reload();
        return;
      }

      const data = await requestAttendanceAll();
      setAttendance(data.result);
    }
    fetchData();
  }, [staff_id]);

  const handelDetail = () => {
    setDetail(true);
  };
  const today = new Date().toLocaleDateString();

  return !detail ? (
    <div>
      <StyledTitle>
        <span>本日（{today}）の全社員勤怠状況</span>
      </StyledTitle>
      <TableContainer sx={{ height: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHead>番号</StyledTableHead>
              <StyledTableHead>Staff ID</StyledTableHead>
              <StyledTableHead>氏名</StyledTableHead>
              <StyledTableHead>出勤時間</StyledTableHead>
              <StyledTableHead>退勤時間</StyledTableHead>
              <StyledTableHead></StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map(
              (
                {
                  staff_id: detail_staff_id,
                  name,
                  attendance_start_time,
                  attendance_end_time,
                },
                index
              ) => (
                <TableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{detail_staff_id}</StyledTableCell>
                  <StyledTableCell>{name}</StyledTableCell>
                  <StyledTableCell>{attendance_start_time}</StyledTableCell>
                  <StyledTableCell>{attendance_end_time}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      onClick={handelDetail}
                      to={`/detail?staff_id=${detail_staff_id}&name=${name}`}
                      state={{ staff_id, name }}
                    >
                      詳細を見る ▶
                    </Link>
                  </StyledTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <Detail detail={detail} data={attendance} />
  );
}

export default AttendanceListAll;
