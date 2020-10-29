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

function displaySubmitErrorModal() {
  document.querySelector('.container').classList.add('modal-check');
  document.querySelector('#modal').classList.remove('hidden');
}

var $allInputs = document.querySelectorAll('input');
$formSelect.addEventListener('submit', function (event) {
  event.preventDefault();
  for (var i = 0; i < $allInputs.length; i++) {
    if (!$allInputs[i].value.trim()) {
      displaySubmitErrorModal();
      return;
    }
  }
  data.profile.username = $userNameInfo.value;
  data.profile.avatarUrl = $avatarUrl.value;
  data.profile.fullName = $userFullNameInfo.value;
  data.profile.location = $userLocationInfo.value;
  data.profile.bio = $userBioInfo.value;
  $imageSelect.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapView('profile');
  $formSelect.reset();
});

function domTreeRender(data) {
  var $main = document.createElement('main');
  $main.setAttribute('class', 'column-half top-main');
  var $viewProfile = document.querySelector('.view-profile');
  $viewProfile.appendChild($main);
  var $div1 = document.createElement('div');
  $div1.textContent = data.profile.fullName;
  $main.appendChild($div1);
  var $image = document.createElement('img');
  $image.setAttribute('src', data.profile.avatarUrl);
  $main.appendChild($image);

  var $main2 = document.createElement('main');
  $main2.setAttribute('class', 'column-half right-column');
  $viewProfile.appendChild($main2);

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'user-icon');
  $main2.appendChild($div2);
  var $icon1 = document.createElement('i');
  var $span1 = document.createElement('span');
  $span1.textContent = data.profile.username;
  $icon1.setAttribute('class', 'fas fa-user icon icon1');
  $div2.appendChild($icon1);
  $div2.appendChild($span1);

  var $div3 = document.createElement('div');
  $div3.setAttribute('class', 'user-icon');
  $main2.appendChild($div3);
  var $icon2 = document.createElement('i');
  var $span2 = document.createElement('span');
  $span2.textContent = data.profile.location;

  $icon2.setAttribute('class', 'fas fa-map-marker-alt icon icon2');
  $div3.appendChild($icon2);
  $div3.appendChild($span2);

  var $article = document.createElement('article');
  var $div4 = document.createElement('div');
  $article.appendChild($div4);
  $article.textContent = data.profile.bio;
  $main2.appendChild($article);

  var $editButton = document.createElement('button');
  $editButton.setAttribute('data-view', 'edit-profile');
  $editButton.className = ('edit-button');
  $main2.appendChild($editButton);

  var $a = document.createElement('a');
  $a.setAttribute('href', '#');
  $a.textContent = 'Edit Profile';
  $a.setAttribute('data-view', 'edit-profile');
  $a.className = 'edit-profile-text';
  $editButton.appendChild($a);

  return $viewProfile;
}
function swapView(dataViewNameToShow) {
  if (dataViewNameToShow === 'profile') {
    data.view = dataViewNameToShow;
    document.querySelector('.view-profile').classList.remove('hidden');
    document.querySelector('.edit-profile').classList.add('hidden');
    document.querySelector('.view-profile').textContent = '';
    document.querySelector('.container').append(domTreeRender(data));

  } else if (dataViewNameToShow === 'edit-profile') {
    data.view = 'edit-profile';
    document.querySelector('.view-profile').classList.add('hidden');
    document.querySelector('.edit-profile').classList.remove('hidden');
    $imageSelect.setAttribute('src', data.profile.avatarUrl);
    $avatarUrl.value = data.profile.avatarUrl;
    $userNameInfo.value = data.profile.username;
    $userFullNameInfo.value = data.profile.fullName;
    $userLocationInfo.value = data.profile.location;
    $userBioInfo.value = data.profile.bio;
  }
}

window.addEventListener('beforeunload', function () {
  localStorage.setItem('UserData', JSON.stringify(data));
});

document.addEventListener('DOMContentLoaded', function (event) {
  var loadStorage = localStorage.getItem('UserData');
  data = JSON.parse(loadStorage);
  if (data.profile.username === '') {
    swapView('edit-profile');
  } else {
    swapView('profile');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return false;
  }
  if (event.target.getAttribute('data-view') === 'profile') {
    swapView('profile');
  }
  if (event.target.getAttribute('data-view') === 'edit-profile') {
    swapView('edit-profile');
  }
});

var $modal = document.querySelector('#modal');
document.querySelector('.x').addEventListener('click', function (event) {
  $modal.classList.add('hidden');
  document.querySelector('.container').classList.remove('modal-check');
});
