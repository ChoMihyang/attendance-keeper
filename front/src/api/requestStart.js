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
        console.log("スタートに成功しました");
      } else {
        alert("スタートに失敗しました");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default requestStart;
