function requestStart(staff_id) {
  fetch("http://localhost:8000/api/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ staff_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        console.log("出勤に成功しました");
      } else {
        alert("出勤に失敗しました");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default requestStart;
