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

// function domTreeRender(data) {
//   var $viewProfileDiv = document.createElement('div');
//   $viewProfileDiv.setAttribute('class', 'view-profile');
//   $viewProfileDiv.setAttribute('data-view', 'view-profile');
//   var loadStorage = localStorage.getItem('UserData');
//   var newData = JSON.parse(loadStorage);
//   var $topMainAttribute = document.querySelector('.top-main');
//   var $topRow = document.querySelector('.top-row');

//   $viewProfileDiv.textContent = newData.fullName;
//   $topMainAttribute.appendChild($viewProfileDiv);

//   var $image = document.createElement('img');
//   $image.setAttribute('src', newData.avatarUrl);
//   $topMainAttribute.appendChild($image);

//   var $secondMainDiv = document.createElement('main');
//   $secondMainDiv.setAttribute('class', 'column-half right-column view-profile-info');

//   var $icon1 = document.createElement('img');
//   var $icon2 = document.createElement('img');
//   var $span1 = document.createElement('p');
//   var $span2 = document.createElement('p');

//   $span1.textContent = newData.username;
//   $span2.textContent = newData.location;

//   $icon1.setAttribute('src', '../../lfz/user Icon.png');
//   $icon1.setAttribute('class', 'icon icon1');

//   $icon2.setAttribute('src', '../../lfz/location-icon.jpg');
//   $icon2.setAttribute('class', 'icon icon2');

//   $secondMainDiv.appendChild($icon1);
//   $secondMainDiv.appendChild($span1);

//   $secondMainDiv.appendChild($icon2);
//   $secondMainDiv.appendChild($span2);

//   $topRow.appendChild($topMainAttribute);
//   $topRow.appendChild($secondMainDiv);

//   var $article = document.createElement('article');
//   $article.textContent = newData.bio;
//   $secondMainDiv.append($article);

//   return $topRow;
// }
// domTreeRender(data)

// function toggle(dataViewNameToShow) {
//   var $topMainElement = document.querySelector('.top-main');
//   var $dataViewAttribute = $topMainElement.getAttribute('data-view')
//   var $viewProfile = document.querySelector('.view-profile')

//   if ($dataViewAttribute === dataViewNameToShow) {
//     data.view = dataViewNameToShow

//   }else {
//     data.view = 'profile'
//     $viewProfile.textContent = ''
//   }

// }
