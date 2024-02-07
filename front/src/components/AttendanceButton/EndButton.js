import { Button } from "@mui/material";
import requestEnd from "../../api/requestEnd";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  borderRadius: '50%', 
  width: '200px', 
  height: '200px',
  fontSize: '1.6rem', 
  marginLeft: '20%',
});

function EndButton({ disabled, staffId }) {
  const handleAttend = () => {
    requestEnd(staffId);
    window.location.reload(false);
  };

  return (
    <StyledButton disabled={disabled} variant="contained" onClick={handleAttend}>
      <h2>退勤</h2>
    </StyledButton>
  );
}

export default EndButton;
