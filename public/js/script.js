(function () {
  'use strict';

  // Fetch all forms with the 'needs-validation' class
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission if invalid
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
//review

  const stars = document.querySelectorAll('.star');
  let selectedRating = 0;

  function selectStar(rating) {
    selectedRating = rating;
    document.getElementById('rating').value = selectedRating;
    updateStars(rating);
  }

  function hoverStar(rating) {
    updateStars(rating);
  }

  function resetStar() {
    updateStars(selectedRating);
  }

  function updateStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('highlight');
      } else {
        star.classList.remove('highlight');
      }
    });
  }
