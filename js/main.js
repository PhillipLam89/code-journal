var $avatarUrl = document.querySelector('#avatarUrl');
var $imageSelect = document.querySelector('img');
$avatarUrl.addEventListener('input', function (event) {
  $imageSelect.setAttribute('src', event.target.value);

});

//  src="../../../jeffm/amazon return label.png"
