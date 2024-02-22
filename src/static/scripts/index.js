document.getElementById('StudentButton').onclick = function() {
    event.preventDefault();
    window.location.href = 'static/portal/studentLogin.html';
}

document.getElementById('TeacherButton').onclick = function() {
    event.preventDefault();
    window.location.href = 'static/portal/teacherLogin.html';
}