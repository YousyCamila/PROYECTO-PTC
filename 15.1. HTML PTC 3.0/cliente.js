document.getElementById('logoutBtn').addEventListener('click', function() {
    window.location.href = 'login.html'; 
});

document.getElementById('navEstadoCaso').addEventListener('click', function() {
    showSection('estadoCaso');
});

document.getElementById('navHistorialCaso').addEventListener('click', function() {
    showSection('historialCaso');
});

document.getElementById('navSubirEvidencia').addEventListener('click', function() {
    showSection('subirEvidencia');
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

showSection('estadoCaso');
