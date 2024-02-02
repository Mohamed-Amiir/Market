document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    
    // You can perform validation and authentication here
    console.log('Login attempt with username:', username, 'and password:', password);
  });
  
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
  
    // You can perform validation and registration logic here
    console.log('Signup attempt with username:', username, 'email:', email, 'and password:', password);
  });
  