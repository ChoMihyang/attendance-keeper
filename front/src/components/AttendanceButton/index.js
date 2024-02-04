import StartButton from "./StartButton";
import EndButton from "./EndButton";
import { styled } from "@mui/system";

function AttendanceButton({
  staffId,
  todayAttendance: { today_start_time, today_end_time },
}) {
  const isStartButtonDisabled = today_start_time !== null;
  const isEndButtonDisabled = !(
    today_start_time !== null && today_end_time === null
  );
  const StyledButtons = styled("div")({
    borderRadius: "20px",
    border: "1px solid #C7C8CC",
    padding: "20px",
    margin: "50px 0",
  });
  const StyledTime = styled("span")({
    fontSize: "3rem",
    margin: "0 80px",
  });
  return (
    <div>
      {!isStartButtonDisabled && <h1>おはようございます！🌞</h1>}
      {isStartButtonDisabled && isEndButtonDisabled && (
        <h1>お疲れさまでした！🙇🏻‍♀️</h1>
      )}
      <StyledButtons>
        <StartButton staffId={staffId} disabled={isStartButtonDisabled} />
        {today_start_time !== null ? (
          <StyledTime>{today_start_time}</StyledTime>
        ) : (
          <StyledTime>--:--:--</StyledTime>
        )}
        <EndButton staffId={staffId} disabled={isEndButtonDisabled} />
        {today_start_time !== null ? (
          <StyledTime>{today_end_time}</StyledTime>
        ) : (
          <StyledTime>--:--:--</StyledTime>
        )}
      </StyledButtons>
    </div>
  );
}

export default AttendanceButton;
