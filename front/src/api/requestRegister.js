function requestRegister(registerData) {
  fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        alert(
          "登録が完了しました。初期パスワードは'000000'です。ログイン画面からログインしパスワードをご変更ください。"
        );
        window.location.href = "/login";
      } else {
        alert("氏名または社員IDをもう一度ご確認ください。");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default requestRegister;
