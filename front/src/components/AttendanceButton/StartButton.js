import { Button, makeStyles } from "@mui/material";
import requestStart from "../../api/requestStart";

function StartButton({ disabled }) {
  const handleAttend = () => {
    requestStart("240128001");
    window.location.reload(false);
  };
  return (
    <Button
      disabled={disabled !== ""}
      variant="contained"
      onClick={handleAttend}
    >
      出勤
    </Button>
  );
}

export default StartButton;
