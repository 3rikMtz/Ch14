const signUpFormHandler = async (e) => {
    
  e.preventDefault();
  
  const username = document.getElementById('username-sign').value.trim();
  const email = document.getElementById('email-sign').value.trim();
  const password = document.getElementById('password-sign').value.trim();

  if(username && email && password) {
      const response = await fetch('/api/users', {
          method: 'POST', 
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json '},
      });

      if(response.ok) {
          document.location.replace('/home');
      } else {
          alert(response.statusText);
      }
  }
};

document.getElementById('sign-form')
      .addEventListener('submit', signUpFormHandler);

