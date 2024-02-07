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
  const StyledDiv = styled("div")({
    borderRadius: "20px",
    border: "1px solid #C7C8CC",
    fontFamily: "noto sans jp",
    padding: "20px",
    margin: "50px 0",
  });
  const StyledH1 = styled("h1")({
    fontFamily: "noto sans jp",
    fontSize: "3rem",
  });

  const StyledTime = styled("span")({
    fontSize: "3rem",
    margin: "0 80px",
  });

  return (
    <div>
      {!isStartButtonDisabled && <StyledH1>おはようございます！🌞</StyledH1>}
      {isStartButtonDisabled && isEndButtonDisabled && (
        <StyledH1>お疲れさまでした！🙇🏻‍♀️</StyledH1>
      )}
      <StyledDiv>
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
      </StyledDiv>
    </div>
  );
}

export default AttendanceButton;
