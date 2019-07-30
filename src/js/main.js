let hamburger = document.querySelector(".fa-bars");
let overlay = document.querySelector(".site-overlay");
let navigation = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  overlay.classList.add("active");
  navigation.classList.add("active");
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  navigation.classList.remove("active");
});

navigation.addEventListener("click", e => {
  if (e.target.nodeName === "A") {
    overlay.classList.remove("active");
    navigation.classList.remove("active");
  }
});

let error = document.querySelector("#error");
let submit_btn = document.querySelector("#btn_sub");

submit_btn.addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#name").value;
  if (document.querySelector("#name").value === "") {
    error.innerHTML = "Enter name!";
    return false;
  } else if (document.querySelector("#email").value === "") {
    error.innerHTML = "Enter email!";
    return false;
  } else {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "mail.php");
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
    });
    xhr.send(new FormData(form));

    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    alert("Thank you! You message sent");
  }
});
// let fetchForm = () =>
//   fetch("../mail.php", {
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: document.querySelector("#name").value,
//       email: document.querySelector("#email").value
//     }),
//     success: function(data) {
//       if (!data) {
//         alert("Message not send");
//       } else {
//         console.log("Mail send! Thank you!");
//       }
//     }
// }).then(res => console.log(res));
