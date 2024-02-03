import { Button, makeStyles } from "@mui/material";

function EndButton({ disabled }) {
  const handleAttend = () => {
    console.log("attend");
  };
  return (
    <Button
      disabled={disabled !== ""}
      variant="contained"
      onClick={handleAttend}
    >
      退勤
    </Button>
  );
}

export default EndButton;
