from flask import Flask, render_template, request, session
from cryptography.fernet import Fernet

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    text = request.form['text']
    if not text:
        return 'Text is required', 400

    try:
        key = Fernet.generate_key()
        cipher = Fernet(key)
        encrypted_text = cipher.encrypt(text.encode()).decode()
        session['key'] = key  # Store the key in the session
        return encrypted_text
    except Exception as e:
        return 'Encryption failed: ' + str(e), 400

@app.route('/decrypt', methods=['POST'])
def decrypt():
    text = request.form['text']
    if not text:
        return 'Text is required', 400

    key = session.get('key')  # Retrieve the key from the session
    if not key:
        return 'No key found for decryption', 400

    try:
        cipher = Fernet(key)
        decrypted_text = cipher.decrypt(text.encode()).decode()
        return decrypted_text
    except Exception as e:
        return 'Decryption failed: ' + str(e), 400

if __name__ == '__main__':
    app.run(debug=True)
