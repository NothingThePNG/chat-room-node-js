const username = document.getElementById('username');

username.value = localStorage.getItem('username');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let name = username.value;
        if (name.trim() === '') {
            alert('Please enter a valid name.');
            return;
        } else {
            localStorage.setItem('username', name);
            window.location.href = 'chat-room.html';
        }
    }
});