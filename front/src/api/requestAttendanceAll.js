const requestAttendanceAll = async () => {
  return await fetch(`${process.env.REACT_APP_API_URL}/attendance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
};

export default requestAttendanceAll;
