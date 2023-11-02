function generateSessionId(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let sessionId = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        sessionId += charset[randomIndex];
    }

    return sessionId;
}

function generateQRCode(sessionId) {
    const script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
    script.onload = function() {
        // Once the external script is loaded, create the QR code
        const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: sessionId,
            width: 128,
            height: 128
        });
    };
    document.head.appendChild(script);
    console.log('generateQRCode called with sessionId:', sessionId);
}

document.addEventListener('DOMContentLoaded', function() {
    const sessionId = generateSessionId(48); // Generate a session ID
    generateQRCode(sessionId); // Generate and display the QR code
});