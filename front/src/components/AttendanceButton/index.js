import StartButton from "./StartButton";
import EndButton from "./EndButton";

function AttendanceButton({
  todayAttendance: { today_start_time, today_end_time },
}) {
  return (
    <div>
      <StartButton disabled={today_start_time} />
      <EndButton disabled={today_end_time} />
    </div>
  );
}

export default AttendanceButton;
