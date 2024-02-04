import StartButton from "./StartButton";
import EndButton from "./EndButton";

function AttendanceButton({
  staffId,
  todayAttendance: { today_start_time, today_end_time },
}) {
  const isStartButtonDisabled = today_start_time !== null;
  const isEndButtonDisabled = !(
    today_start_time !== null && today_end_time === null
  );
  return (
    <div>
      <StartButton staffId={staffId} disabled={isStartButtonDisabled} />
      <EndButton staffId={staffId} disabled={isEndButtonDisabled} />
      {!(isStartButtonDisabled) && (
        <h1>おはようございます！🌞</h1>
      )}
      {isStartButtonDisabled && isEndButtonDisabled && (
        <h1>お疲れさまでした！🙇🏻‍♀️</h1>
      )}
    </div>
  );
}

export default AttendanceButton;
