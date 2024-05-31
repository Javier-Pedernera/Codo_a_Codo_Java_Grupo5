document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var mail = document.getElementById('mail').value
    var age = document.getElementById('age').value
    
    if (username.trim() === '' || password.trim() === '' || mail.trim() === '' || age.trim() === '') {
        alert('Por favor, complete todos los campos.');
    } else {
        alert('Registro exitoso usuario: ' + username);
    }
});