async function requestAccount(staff_id) {
  return await fetch(`http://localhost:8000/api/account/${staff_id}`, {
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
}

export default requestAccount;