function requestEnd(staff_id) {
  return fetch("http://localhost:8000/api/attendance", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ staff_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        console.log("退勤に成功しました");
      } else {
        alert("退勤に失敗しました");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default requestEnd;
