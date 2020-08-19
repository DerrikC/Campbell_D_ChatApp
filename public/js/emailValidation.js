const errorElement = document.getElementById('error');
const button = document.querySelector('.submit');
const email = document.querySelector('.email');

button.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validation for email
  const matchEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(matchEmail)) {
    console.log('This will work');
  } else {
    console.log('Silly needs to enter a valid email')
  }
});
