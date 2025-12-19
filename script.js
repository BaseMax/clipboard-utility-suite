// Get elements
const inputText = document.getElementById('inputText');
const status = document.getElementById('status');

// Show status message
function showStatus(message, type = 'success') {
    status.textContent = message;
    status.className = `status ${type}`;
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 3000);
}

// Base64 Encode
function base64Encode() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    try {
        // Convert string to UTF-8 bytes and then to Base64
        const utf8Bytes = new TextEncoder().encode(text);
        const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
        const encoded = btoa(binaryString);
        inputText.value = encoded;
        showStatus('✓ Encoded to Base64');
    } catch (error) {
        showStatus('Error encoding to Base64', 'error');
    }
}

// Base64 Decode
function base64Decode() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    try {
        // Decode Base64 to binary string, then convert to UTF-8
        const binaryString = atob(text);
        const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        inputText.value = decoded;
        showStatus('✓ Decoded from Base64');
    } catch (error) {
        showStatus('Error decoding from Base64 - Invalid Base64 string', 'error');
    }
}

// URL Encode
function urlEncode() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    const encoded = encodeURIComponent(text);
    inputText.value = encoded;
    showStatus('✓ URL Encoded');
}

// URL Decode
function urlDecode() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    try {
        const decoded = decodeURIComponent(text);
        inputText.value = decoded;
        showStatus('✓ URL Decoded');
    } catch (error) {
        showStatus('Error decoding URL - Invalid URL encoded string', 'error');
    }
}

// Convert to UPPERCASE
function toUpperCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    inputText.value = text.toUpperCase();
    showStatus('✓ Converted to UPPERCASE');
}

// Convert to lowercase
function toLowerCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    inputText.value = text.toLowerCase();
    showStatus('✓ Converted to lowercase');
}

// Convert to Title Case
function toTitleCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    const titleCase = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    inputText.value = titleCase;
    showStatus('✓ Converted to Title Case');
}

// Convert to camelCase
function toCamelCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    const camelCase = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
    inputText.value = camelCase;
    showStatus('✓ Converted to camelCase');
}

// Convert to snake_case
function toSnakeCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    const snakeCase = text
        .replace(/\s+/g, '_')
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    inputText.value = snakeCase;
    showStatus('✓ Converted to snake_case');
}

// Convert to kebab-case
function toKebabCase() {
    const text = inputText.value;
    if (!text) {
        showStatus('Please enter some text first', 'error');
        return;
    }
    const kebabCase = text
        .replace(/\s+/g, '-')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    inputText.value = kebabCase;
    showStatus('✓ Converted to kebab-case');
}

// Copy to Clipboard
async function copyToClipboard() {
    const text = inputText.value;
    if (!text) {
        showStatus('Nothing to copy', 'error');
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        showStatus('✓ Copied to clipboard!');
    } catch (error) {
        // Fallback: manually select and prompt user
        inputText.select();
        inputText.setSelectionRange(0, 99999); // For mobile devices
        showStatus('Text selected. Press Ctrl+C to copy', 'error');
    }
}

// Paste from Clipboard
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        inputText.value = text;
        showStatus('✓ Pasted from clipboard');
    } catch (error) {
        showStatus('Cannot read from clipboard. Please paste manually (Ctrl+V)', 'error');
    }
}

// Clear Text
function clearText() {
    inputText.value = '';
    showStatus('✓ Text cleared');
}

// Auto-focus on textarea on page load
window.addEventListener('load', () => {
    inputText.focus();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+C to copy
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToClipboard();
    }
    // Ctrl+Shift+V to paste
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        pasteFromClipboard();
    }
});
