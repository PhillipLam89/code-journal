var $avatarUrl = document.querySelector('#avatarUrl');
var $imageSelect = document.querySelector('img');
var $formSelect = document.querySelector('form');

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
  data.profile.avatarUrl = $avatarUrl.value;
  data.profile.fullName = $userFullNameInfo.value;
  data.profile.location = $userLocationInfo.value;
  data.profile.bio = $userBioInfo.value;

  $imageSelect.setAttribute('src', 'images/placeholder-image-square.jpg');
  localStorage.setItem('UserData', JSON.stringify(data.profile));
  document.querySelector('form').reset();
});

var currentData = JSON.stringify(data.profile);
var previousData = localStorage.getItem('UserData');

if (previousData !== null) {
  currentData = JSON.parse(previousData);
  localStorage.setItem('UserData', JSON.stringify(currentData));
}
