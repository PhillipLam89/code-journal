var $avatarUrl = document.querySelector('#avatarUrl');
var $imageSelect = document.querySelector('img');
var $formSelect = document.querySelector('.submit-button');

$avatarUrl.addEventListener('input', function (event) {
  $imageSelect.setAttribute('src', event.target.value);
});

$formSelect.addEventListener('submit', function (event) {
  event.preventDefault();

});

//  src="../../../jeffm/amazon return label.png"
