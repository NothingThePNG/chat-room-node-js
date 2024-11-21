const username = document.getElementById('username');
const colour = document.getElementById('colour');


class User {
    constructor (username, colour) {
        this.username = username;
        this.colour = colour;
    }
}



let user = localStorage.getItem('user'); 

if (user) {
    user = JSON.parse(user);
    username.value = user.username;
    colour.value = user.colour;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let name = username.value;
        let color = colour.value;
        if (name.trim() === '' || name.trim() === 'Server') {
            alert('Please enter a valid name.');
            return;
        } else {
            user = new User(name, color);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'chat-room.html';
        }
    }
});