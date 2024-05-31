document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, complete todos los campos.');
    } else {
        alert('Inicio de sesión exitoso con usuario: ' + username);
    }
});