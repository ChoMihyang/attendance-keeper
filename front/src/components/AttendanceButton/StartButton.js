import { Button } from "@mui/material";
import requestStart from "../../api/requestStart";

function StartButton({ disabled, staffId }) {
  const handleAttend = () => {
    requestStart(staffId);
    window.location.reload(false);
  };
  console.log(disabled);
  return (
    <Button disabled={disabled} variant="contained" onClick={handleAttend}>
      出勤
    </Button>
  );
}

export default StartButton;
