// Password protection
let projectName = "";
let projectUrl = {
  'activation': 'https://docs.google.com/presentation/d/1MHx7nsu9_8CJW1cUffUehnOePQKtgVtWt9Zuezn5YEY/edit?usp=sharing',
  'ring': './projects/ltrin.html',
  'TTefficiency': './projects/tteff.html',
};
let psw = 'af6GmuX';
let url = './jGLMcofrtekH7kq7.html';

function enterPortfolio() {
  $('#wrongpsw').removeClass('show');
  if ($('#psw').val() === psw) {
    window.location.href = url;
  } else {
    $('#wrongpsw').addClass('show');
  }
}

function openPopup(project) {
  document.getElementById("popup").style.display = "block";
  projectName = project;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function openProject() {
  $('#wrongpsw').removeClass('show');
  if ($('#psw').val() === psw) {
    // window.open(projectUrl[projectName]);
    window.location.href = projectUrl[projectName];
  } else {
    $('#wrongpsw').addClass('show');
  }
}
