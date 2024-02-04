import { Button } from "@mui/material";
import requestEnd from "../../api/requestEnd";

function EndButton({ disabled, staffId }) {
  const handleAttend = () => {
    requestEnd(staffId);
    window.location.reload(false);
  };

  return (
    <Button disabled={disabled} variant="contained" onClick={handleAttend}>
      退勤
    </Button>
  );
}

export default EndButton;
