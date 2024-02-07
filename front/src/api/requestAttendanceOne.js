const requestAttendanceOne = async (staff_id) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/attendance/${staff_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
};

export default requestAttendanceOne;
