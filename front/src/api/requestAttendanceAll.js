const requestAttendanceAll = async () => {
  return await fetch('http://localhost:8000/api/attendance', {
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
