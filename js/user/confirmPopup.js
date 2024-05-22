function createConfirmationPopup() {
    var popupHTML = `
        <div id="confirmationPopup" class="popup-overlay" style="display: none;">
            <div class="popup-container">
                <p id="confirmationMessage"></p>
                <button id="confirmYes" class="popup-button yes-button">Yes</button>
                <button id="confirmNo" class="popup-button no-button">No</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

function showConfirmationPopup(message, onConfirm, onCancel) {
    var popup = document.getElementById('confirmationPopup');
    var messageElement = document.getElementById('confirmationMessage');
    var confirmButton = document.getElementById('confirmYes');
    var cancelButton = document.getElementById('confirmNo');

    messageElement.textContent = message;

    confirmButton.onclick = function() {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
        popup.style.display = 'none';
    };

    cancelButton.onclick = function() {
        if (typeof onCancel === 'function') {
            onCancel();
        }
        popup.style.display = 'none';
    };

    popup.style.display = 'block';
}