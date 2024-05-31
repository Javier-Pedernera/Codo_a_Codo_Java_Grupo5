document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        // Muestra el modal de error
        var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    } else {
        // Muestra el modal de inicio de sesión exitoso
        var modalUsername = document.getElementById('modalUsername');
        modalUsername.textContent = username;
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }
});
