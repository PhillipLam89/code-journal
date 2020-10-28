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
  SwapView('profile');
  $formSelect.reset();
});

var currentData = JSON.stringify(data.profile);
var previousData = localStorage.getItem('UserData');

if (previousData !== null) {
  currentData = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function () {
  localStorage.setItem('UserData', JSON.stringify(currentData));
});

function domTreeRender(data) {
  var loadStorage = localStorage.getItem('UserData');
  var newData = JSON.parse(loadStorage);
  var $main = document.createElement('main');
  $main.setAttribute('class', 'column-half top-main');
  var $viewProfile = document.querySelector('.view-profile');
  $viewProfile.appendChild($main);
  var $div1 = document.createElement('div');
  $div1.textContent = newData.fullName;
  $main.appendChild($div1);
  var $image = document.createElement('img');
  $image.setAttribute('src', newData.avatarUrl);
  $main.appendChild($image);

  var $main2 = document.createElement('main');
  $main2.setAttribute('class', 'column-half right-column');
  $viewProfile.appendChild($main2);

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'user-icon');
  $main2.appendChild($div2);
  var $icon1 = document.createElement('img');
  var $span1 = document.createElement('span');
  $span1.textContent = newData.username;
  $icon1.setAttribute('src', '../../lfz/user Icon.png');
  $icon1.setAttribute('class', 'icon icon1');
  $div2.appendChild($icon1);
  $div2.appendChild($span1);

  var $div3 = document.createElement('div');
  $main2.appendChild($div3);
  var $icon2 = document.createElement('img');
  var $span2 = document.createElement('span');
  $span2.textContent = newData.location;
  $icon2.setAttribute('src', '../../lfz/location-icon.jpg');
  $icon2.setAttribute('class', 'icon icon2');
  $div3.appendChild($icon2);
  $div3.appendChild($span2);

  var $article = document.createElement('article');
  var $div4 = document.createElement('div');
  $article.appendChild($div4);
  $article.textContent = newData.bio;
  $main2.appendChild($article);

  return $viewProfile;
}
// domTreeRender(data);

function SwapView(dataViewNameToShow) {

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
  }

}
