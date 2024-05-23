

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


createConfirmationPopup();

function showConfirmationPopup(message, onConfirm, id, usertype) {
    var popup = document.getElementById('confirmationPopup');
    var messageElement = document.getElementById('confirmationMessage');
    var confirmButton = document.getElementById('confirmYes');
    var cancelButton = document.getElementById('confirmNo');

    messageElement.textContent = message;

    confirmButton.onclick = function () {
        if (typeof onConfirm === 'function') {

            if (usertype === 'tech') {
                cancelBookingTech(id);
            }
            else {

                console.log(id);
                cancelBooking(id);
            }
        }
        popup.style.display = 'none';
    };

    cancelButton.onclick = function () {
        if (typeof onCancel === 'function') {
            console.log('no');
            onCancel();
        }
        popup.style.display = 'none';
    };

    popup.style.display = 'flex'; 
}

