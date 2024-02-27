var loginButton = document.getElementById('loginButton')
var signInButton = document.getElementById('signInButton')

loginButton.addEventListener('click', ()=>{
    alert('Login Clicked!')
})

signInButton.addEventListener('click', ()=>{
    window.open('/signUpPage', '_blank', 'width=600,height=400,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes')
})
