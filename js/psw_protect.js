// Password protection
let projectName = "";
let projectUrl = {
  'activation': 'https://docs.google.com/presentation/d/1MHx7nsu9_8CJW1cUffUehnOePQKtgVtWt9Zuezn5YEY/edit?usp=sharing',
  'ring': './projects/XRgb9bwf.html',
};

function openPopup(project) {
  document.getElementById("popup").style.display = "block";
  projectName = project;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function openProject() {
  $('#wrongpsw').removeClass('show');
  if ($('#psw').val() === 'watermelon') {
    window.open(projectUrl[projectName], '_blank');
    // window.location.href = projectUrl[projectName];
  } else {
    $('#wrongpsw').addClass('show');
  }
}
