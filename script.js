let currentRoad = null;

// Ändra färg på vägen baserat på status
function changeRoadColor(roadId, status) {
    var roadElement = document.getElementById(roadId);
    switch (status) {
        case "Optimerad":
            roadElement.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
            break;
        case "Planerad":
            roadElement.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            break;
        case "Avställd":
            roadElement.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            break;
        case "Ej Optimerad":
            roadElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
            break;
    }
}

// Hantera högerklick på vägar och visa contextmenyn
document.querySelectorAll('.road').forEach(function(road) {
    road.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        currentRoad = this;
        showContextMenu(event.clientX, event.clientY);
    });
});

// Funktion för att uppdatera kommentarssektionen
function updateCommentSectionStatus(roadId, status) {
    console.log("Uppdaterar " + roadId + " till " + status);
    var statusDropdown = document.querySelector('tr[data-road-id="' + roadId + '"] select');
    if (statusDropdown) {
        statusDropdown.value = status;
    }
}

// Visa contextmenyn vid muspekarens position
function showContextMenu(x, y) {
    const menu = document.getElementById('contextMenu');
    const offset = 250; // Antal pixlar du vill flytta menyn åt vänster
    menu.style.left = (x - offset) + 'px';
    menu.style.top = y + 'px';
    menu.style.display = 'block';
}

// Funktion för att sätta vägens status från contextmenyn
function setRoadStatus(status) {
    if (currentRoad) {
        changeRoadColor(currentRoad.id, status);
        updateCommentSectionStatus(currentRoad.id, status);
    }
    document.getElementById('contextMenu').style.display = 'none';
}

// Stäng contextmenyn om användaren klickar någon annanstans
window.addEventListener('click', function() {
    document.getElementById('contextMenu').style.display = 'none';
});

// Funktion för att växla sidomenyns synlighet
function toggleSidebar() {
    var wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('toggled');
}

// Event listener för hamburgerikonen
document.addEventListener('DOMContentLoaded', function() {
    var wrapper = document.getElementById('wrapper');
    var menuToggle = document.getElementById('menu-toggle');

    // Visa sidofältet som standard när sidan laddas
    wrapper.classList.remove('toggled');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Växla sidofältets synlighet
            wrapper.classList.toggle('toggled');
        });
    }
    
    // Hantera ändringar i status-dropdowns i kommentarssektionen
    document.querySelectorAll('#commentsTable select').forEach(function(selectElement) {
        selectElement.addEventListener('change', function() {
            var roadId = this.closest('tr').getAttribute('data-road-id');
            var selectedStatus = this.value;
            changeRoadColor(roadId, selectedStatus);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('data-target');
            var submenu = document.querySelector(targetId);
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });
});
function saveComment(roadId) {
    // Hämta kommentaren från textrutan för den specifika vägen med roadId
    var comment = document.getElementById('comment-' + roadId).value;

    // Här kan du skicka kommentaren till en server, lagra den lokalt, eller göra vad du vill med den
    // För detta exempel, loggar vi bara kommentaren till konsolen
    console.log('Sparar kommentar för väg ' + roadId + ': ' + comment);
}


