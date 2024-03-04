document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('encryptBtn').addEventListener('click', encryptText);
    document.getElementById('decryptBtn').addEventListener('click', decryptText);
    document.getElementById('resetBtn').addEventListener('click', resetText);
});

async function encryptText() {
    var text = document.getElementById('inputText').value;
    if (!text) {
        alert('Text is required');
        return;
    }

    var response = await fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'text=' + encodeURIComponent(text)
    });

    var encryptedText = await response.text();
    document.getElementById('outputText').value = encryptedText;
}

async function decryptText() {
    var text = document.getElementById('inputText').value;
    if (!text) {
        alert('Text is required');
        return;
    }

    var response = await fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'text=' + encodeURIComponent(text)
    });

    var decryptedText = await response.text();
    document.getElementById('outputText').value = decryptedText;
}


function resetText() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
}
