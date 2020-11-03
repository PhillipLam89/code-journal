var $avatarUrl = document.querySelector('#avatarUrl');
var $imageSelect = document.querySelector('img');
var $formSelect = document.querySelector('form');

var $userNameInfo = document.querySelector('.user-name');
var $userFullNameInfo = document.querySelector('.full-name');
var $userLocationInfo = document.querySelector('.location');
var $userBioInfo = document.querySelector('textarea');

var $modal = document.querySelector('#modal');
document.querySelector('.x').addEventListener('click', function (event) {
  $modal.classList.add('hidden');
  document.querySelector('.container').classList.remove('modal-check');
});

$avatarUrl.addEventListener('input', function (event) {
  $imageSelect.setAttribute('src', event.target.value);
});

function displaySubmitErrorModal() {
  document.querySelector('#form2').classList.add('modal-check');
  document.querySelector('.container').classList.add('modal-check');
  document.querySelector('#modal').classList.remove('hidden');
}

var $allInputs = document.querySelectorAll('.edit-input');

$formSelect.addEventListener('submit', function (event) {
  event.preventDefault();
  for (var i = 0; i < $allInputs.length; i++) {
    if (!$allInputs[i].value.trim()) {
      displaySubmitErrorModal();
      swapView('edit-profile');
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
    document.querySelector('.entries').classList.add('hidden');
    document.querySelector('.create-entry').classList.add('hidden');
    document.querySelector('.view-profile').textContent = '';
    document.querySelector('.container').append(domTreeRender(data));

  } else if (dataViewNameToShow === 'edit-profile') {
    data.view = 'edit-profile';
    document.querySelector('.view-profile').classList.add('hidden');
    document.querySelector('.create-entry').classList.add('hidden');
    document.querySelector('.edit-profile').classList.remove('hidden');
    $imageSelect.setAttribute('src', data.profile.avatarUrl);
    $avatarUrl.value = data.profile.avatarUrl;
    $userNameInfo.value = data.profile.username;
    $userFullNameInfo.value = data.profile.fullName;
    $userLocationInfo.value = data.profile.location;
    $userBioInfo.value = data.profile.bio;
  } else if (dataViewNameToShow === 'entries') {
    data.view = 'entries';
    document.querySelector('.view-profile').classList.add('hidden');
    document.querySelector('.edit-profile').classList.add('hidden');
    document.querySelector('.create-entry').classList.add('hidden');
    document.querySelector('.entries').classList.remove('hidden');
  } else if (dataViewNameToShow === 'create-entry') {
    data.view = 'create-entry';
    document.querySelector('.view-profile').classList.add('hidden');
    document.querySelector('.edit-profile').classList.add('hidden');
    document.querySelector('.entries').classList.add('hidden');
    document.querySelector('.create-entry').classList.remove('hidden');
  }
}

window.addEventListener('beforeunload', function () {
  localStorage.setItem('UserData', JSON.stringify(data));
});

document.addEventListener('DOMContentLoaded', function (event) {
  var loadStorage = localStorage.getItem('UserData');
  data = JSON.parse(loadStorage);
  if (!hasFinishedProfile()) {
    swapView('edit-profile');
  } else {
    swapView('profile');
  }

  for (var i = 0; i < data.entries.length; i++) {
    generateEntries(data.entries[i]);
  }

  function generateEntries(data) {
    var $div1 = document.createElement('div');
    $div1.className = 'column-half entries-image-container';

    var $image = document.createElement('img');
    $image.setAttribute('src', data.imageUrl);
    $image.className = 'entries-image';
    $div1.appendChild($image);

    var $article = document.createElement('article');
    $article.className = 'column-half entries-article';

    var $h2 = document.createElement('h2');
    $h2.textContent = data.title;
    var $p = document.createElement('p');
    $p.textContent = data.notes;

    $article.appendChild($h2);
    $article.appendChild($p);

    document.querySelector('.entries').appendChild($div1);
    document.querySelector('.entries').appendChild($article);

    return document.querySelector('.entries');
  }

});

function hasFinishedProfile() {
  if (data.profile.username !== '' && data.profile.avatarUrl !== '' && data.profile.fullName !== '' && data.profile.localStorage !== '') {
    return true;
  }
}
document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return false;
  }
  if (event.target.getAttribute('data-view') === 'profile' && hasFinishedProfile()) {
    swapView('profile');
  } else if (event.target.getAttribute('data-view') === 'edit-profile') {
    swapView('edit-profile');
    document.querySelector('.view-profile').classList.add('hidden');
  } else if (event.target.getAttribute('data-view') === 'entries' && hasFinishedProfile()) {
    swapView('entries');
  } else if (event.target.getAttribute('data-view') === 'create-entry' && hasFinishedProfile()) {
    swapView('create-entry');
  }
});

var $entryUrl = document.querySelector('.entry-image-url');
var $entryTitle = document.querySelector('.entry-title');
var $entryNotes = document.querySelector('.entry-notes');

var $createEntryImage = document.querySelector('.create-entry-image');

$entryUrl.addEventListener('input', function (event) {
  $createEntryImage.setAttribute('src', event.target.value);
});

document.querySelector('#form2').addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntryData = {};
  newEntryData.imageUrl = $entryUrl.value;
  newEntryData.title = $entryTitle.value;
  newEntryData.notes = $entryNotes.value;

  data.entries.push(newEntryData);
  generateEntries(data.entries[data.entries.length - 1]);

  $createEntryImage.setAttribute('src', $entryUrl.value);
  document.querySelector('#form2').reset();
  swapView('entries');

});

function generateEntries(data) {
  var $div1 = document.createElement('div');
  $div1.className = 'column-half entries-image-container';

  var $image = document.createElement('img');
  $image.setAttribute('src', data.imageUrl);
  $image.className = 'entries-image';
  $div1.appendChild($image);

  var $article = document.createElement('article');
  $article.className = 'column-half entries-article';

  var $h2 = document.createElement('h2');
  $h2.textContent = data.title;
  var $p = document.createElement('p');
  $p.textContent = data.notes;

  $article.appendChild($h2);
  $article.appendChild($p);

  document.querySelector('.entries').appendChild($div1);
  document.querySelector('.entries').appendChild($article);

  return document.querySelector('.entries');
}
