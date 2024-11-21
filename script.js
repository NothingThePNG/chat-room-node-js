const socket = io("http://localhost:3000");
const message_con = document.getElementById("mesige-con");
const input = document.getElementById("message");
const user_count = document.getElementById("user_count");
const user_list_container = document.getElementById("user-list-container");
const user_list = document.getElementById("user-list");

let connection = false;

let user = JSON.parse(localStorage.getItem("user"));

socket.on("server-all-good", () => {
    if (!connection) {
        socket.emit("user-class", user);
        connection = true;
    }
})

socket.on("user-list", (uerList) => {
    uerList = JSON.parse(uerList);
    user_list.innerHTML = "";
    for (let i = 0; i < uerList.length; i++) {
        let new_user = uerList[i];
        console.log(new_user);
        let item = document.createElement("p");
        item.textContent = new_user.username;
        user_list.appendChild(item);
    }
});

socket.on("chat-message-send", data => {
    let text_con = document.createElement("div");
    text_con.classList.add("container");

    let user_id = document.createElement("p");
    user_id.textContent = data[0].username;
    console.log(data[0].colour);
    user_id.classList.add("id");
    user_id.style.background = data[0].colour;

    if (data[0].username === "Server") {
        user_id.classList.add("sever");
    }
    text_con.appendChild(user_id);

    let mes = document.createElement("p");
    mes.textContent = data[1];
    text_con.appendChild(mes);

    message_con.appendChild(text_con);
});

socket.on("users-count", data => {
    user_count.textContent = data.toString() + ": users";
    console.log(data);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let text = input.value;
        socket.emit("chat-message", [user, text]);
        input.value = "";
    } 
    if (e.key === "Tab") {
        e.preventDefault();
        user_list_container.classList.toggle("show");
    }
    // if (e.key === "Escape") {
    //     socket.emit("user-disconnect", uerID);
    //     localStorage.removeItem("uerID");
    //     window.location.reload();
    // }
})