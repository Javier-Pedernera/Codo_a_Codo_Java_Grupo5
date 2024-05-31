document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var mail = document.getElementById('mail').value
    var age = document.getElementById('age').value
    
    if (username.trim() === '' || password.trim() === '' || mail.trim() === '' || age.trim() === '') {
            var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
        } else {
            var modalUsername = document.getElementById('modalUsername');
            modalUsername.textContent = username;
            var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
});