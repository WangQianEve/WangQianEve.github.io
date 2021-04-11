// Password protection
let projectName = "";
let projectUrl = {
  'activation': '35MnYANT.html',
  'ring': 'XRgb9bwf.html',
};

function openPopup (project) {
  document.getElementById("popup").open = true;
  projectName = project;
}

function closePopup () {
  document.getElementById("popup").open = false;
}

function openProject() {
  $('#wrongpsw').removeClass('show');
  if ($('#psw').val() === 'watermelon') {
    window.location.href = './.projects/' + projectUrl[projectName];
  } else {
    $('#wrongpsw').addClass('show');
  }
}
