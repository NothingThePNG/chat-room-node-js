const socket = io("http://localhost:3000");
const message_con = document.getElementById("mesige-con");
const input = document.getElementById("message");
const user_count = document.getElementById("user_count");

let username 

if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
} else {
    username = Math.random().toString(36).substring(2);
    localStorage.setItem("username", username);
    console.log(localStorage.getItem("username"));
}

socket.on("connection", data => {
    console.log("hello " + data);
});

socket.on("chat-message-send", data => {
    let text_con = document.createElement("div");
    text_con.classList.add("container");

    let user_id = document.createElement("p");
    user_id.textContent = data[0];
    user_id.classList.add("id");
    text_con.appendChild(user_id);

    let mes = document.createElement("p");
    mes.textContent = data[1];
    text_con.appendChild(mes);

    message_con.appendChild(text_con);
});

socket.on("users-count", data => {
    user_count.textContent = data.toString() + ": users";
    console.log(data);
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let text = input.value;
        socket.emit("chat-message", [username, text]);
        input.value = "";
    } 
    // if (e.key === "Escape") {
    //     socket.emit("user-disconnect", uerID);
    //     localStorage.removeItem("uerID");
    //     window.location.reload();
    // }
})