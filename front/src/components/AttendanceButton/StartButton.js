import { Button } from "@mui/material";
import requestStart from "../../api/requestStart";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  borderRadius: '50%',
  width: '200px', 
  height: '200px',
  fontSize: '1.5rem',
});

function StartButton({ disabled, staffId }) {
  const handleAttend = () => {
    requestStart(staffId);
    window.location.reload(false);
  };
  return (
    <StyledButton disabled={disabled} variant="contained" onClick={handleAttend}>
      <h2>出勤</h2>
    </StyledButton>
  );
}

export default StartButton;
