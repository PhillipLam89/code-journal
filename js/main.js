var $avatarUrl = document.querySelector('#avatarUrl');
var $imageSelect = document.querySelector('img');
var $formSelect = document.querySelector('.form2');
var $userNameInfo = document.querySelector('.user-name');
var $userFullNameInfo = document.querySelector('.full-name');
var $userLocationInfo = document.querySelector('.location');
var $userBioInfo = document.querySelector('textarea');

$avatarUrl.addEventListener('input', function (event) {
  $imageSelect.setAttribute('src', event.target.value);
});

$formSelect.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $userNameInfo.value;
  data.profile.fullName = $userFullNameInfo.value;
  data.profile.location = $userLocationInfo.value;
  data.profile.bio = $userBioInfo.value;
  document.querySelector('.form').reset();
  document.querySelector('.form2').reset();
  $imageSelect.setAttribute('src', 'images/placeholder-image-square.jpg');
  localStorage.setItem('UserData', JSON.stringify(data));
});
