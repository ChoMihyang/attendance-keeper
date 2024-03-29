async function requestLoginData(loginData) {
  console.log(`${process.env.REACT_APP_API_URL}/login`);
  return await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        console.log("ログインに成功しました");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
}

export default requestLoginData;
