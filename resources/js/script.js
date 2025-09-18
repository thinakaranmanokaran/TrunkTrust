document.querySelectorAll('input[name="method-add"]').forEach(radio => {
    radio.addEventListener('change', e => {
        if (e.target.value === 'Header') {
            document.getElementById('headers-section').style.display = 'block';
            document.getElementById('body-section').style.display = 'none';
        } else {
            document.getElementById('headers-section').style.display = 'none';
            document.getElementById('body-section').style.display = 'block';
        }
    });
});

// Tab switching logic
const textformatDropdown = document.getElementById('textformat-dropdown');
const textformatMethodList = document.getElementById('textformat-method-list');
const textformatSelectedMethod = document.getElementById('textformat-selected-method');
const textformatArrow = document.getElementById('textformat-dropdown-arrow');

const headFormatText = document.getElementById('head-text');
const bodyFormatText = document.getElementById('body-text');

// Toggle dropdown
textformatDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    textformatMethodList.classList.toggle('hidden');
    textformatArrow.classList.toggle('rotate-180');
});

// Map format names to Monaco editor language modes
const formatToLanguage = {
    'Json': 'json',
    'Xml': 'xml',
    'Html': 'html',
    'Text': 'plaintext'
};

// Store selected format for each tab
let tabFormats = {
    Header: 'Json',
    Body: 'Json'
};

// Handle option click
textformatMethodList.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedFormat = e.target.textContent;
        textformatSelectedMethod.textContent = selectedFormat;

        // Update only the active tab's label and store format
        const selectedTab = document.querySelector('input[name="method-add"]:checked').value;
        tabFormats[selectedTab] = selectedFormat;

        if (selectedTab === 'Header') {
            headFormatText.textContent = selectedFormat;
        } else {
            bodyFormatText.textContent = selectedFormat;
        }

        // Update Monaco editor language
        if (window.jsonEditor) {
            monaco.editor.setModelLanguage(
                window.jsonEditor.getModel(),
                formatToLanguage[selectedFormat]
            );
        }

        textformatMethodList.classList.add('hidden');
        textformatArrow.classList.remove('rotate-180');
    });
});

// When switching tabs, update label and editor language to match tab's format
document.querySelectorAll('input[name="method-add"]').forEach(radio => {
    radio.addEventListener('change', e => {
        const selectedTab = e.target.value;
        const selectedFormat = tabFormats[selectedTab];

        if (selectedTab === 'Header') {
            headFormatText.textContent = selectedFormat;
        } else {
            bodyFormatText.textContent = selectedFormat;
        }

        // Update Monaco editor language
        if (window.jsonEditor) {
            monaco.editor.setModelLanguage(
                window.jsonEditor.getModel(),
                formatToLanguage[selectedFormat]
            );
        }
    });
});


// Close dropdown if clicking outside
document.addEventListener('click', () => {
    textformatMethodList.classList.add('hidden');
    textformatArrow.classList.remove('rotate-180');
});


const dropdown = document.getElementById('method-dropdown');
const methodList = document.getElementById('method-list');
const selectedMethod = document.getElementById('selected-method');
const arrow = document.getElementById('dropdown-arrow');

// Toggle dropdown
dropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from closing immediately
    methodList.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
});

// Handle option click
methodList.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering parent click
        selectedMethod.textContent = e.target.textContent;
        methodList.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    });
});

// Close dropdown if clicking outside
document.addEventListener('click', () => {
    methodList.classList.add('hidden');
    arrow.classList.remove('rotate-180');
});

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    // Define custom light theme
    monaco.editor.defineTheme('customLight', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#ffffff',
            'editor.foreground': '#000000',
            'editor.lineHighlightBackground': '#f0f7ff',
            'editor.selectionBackground': '#cce0ff',
            'editorCursor.foreground': '#ff6600'
        }
    });

    // Apply the theme
    monaco.editor.setTheme('customLight');

    // Create editors - ONLY ONCE
    window.jsonEditor = monaco.editor.create(document.getElementById('json-editor'), {
        value: '',
        language: 'json',
        theme: 'customLight',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14
    });

    window.responseEditor = monaco.editor.create(document.getElementById('response-editor'), {
        value: '',
        language: 'json',
        theme: 'customLight',
        readOnly: true,
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14
    });


    // Tab switching logic
    document.querySelectorAll('input[name="method-add"]').forEach(radio => {
        radio.addEventListener('change', e => {
            //             if (e.target.value === 'Header') {
            //                 jsonEditor.setValue(`{
            //     "Content-Type": "application/json",
            //     "Authorization": "Bearer <token>",
            //     "Accept": "application/json"
            // }`);
            //             } else {
            //                 jsonEditor.setValue(`{
            //     "name": "John Doe",
            //     "age": 25
            // }`);
            //             }
        });
    });

    // Ensure all header values are strings
    const formattedHeaders = {};
    for (const key in headers) {
        if (Object.hasOwnProperty.call(headers, key)) {
            formattedHeaders[key] = String(headers[key]);
        }
    }

    // If body exists and no Content-Type, add it
    if (body && !formattedHeaders['Content-Type'] && !formattedHeaders['content-type']) {
        formattedHeaders['Content-Type'] = 'application/json';
    }

    const options = { method, headers: formattedHeaders };
    if (body) options.body = JSON.stringify(body);


    // Send request
    document.getElementById('send').addEventListener('click', async () => {
        const url = document.getElementById('url').value.trim();
        const method = document.getElementById('selected-method').textContent.trim();

        let editorContent;
        try {
            editorContent = JSON.parse(jsonEditor.getValue() || '{}');
        } catch (e) {
            responseEditor.setValue('Invalid JSON in editor.');
            return;
        }

        let headers = {};
        let body = null;
        const selectedTab = document.querySelector('input[name="method-add"]:checked').value;
        if (selectedTab === 'Header') headers = editorContent;
        else body = editorContent;

        try {
            const options = { method, headers };
            if (body) options.body = JSON.stringify(body);

            const res = await fetch(url, options);
            const resultText = await res.text();

            let displayOutput;
            try {
                displayOutput = JSON.stringify(JSON.parse(resultText), null, 2);
            } catch {
                displayOutput = resultText;
            }

            responseEditor.setValue(displayOutput);
            document.getElementById('status').textContent = `Status: ${res.status}`;
        } catch (err) {
            responseEditor.setValue('Error: ' + err.message);
        }
    });

    // Allow Enter key to send
    document.getElementById('url').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('send').click();
        }
    });
});

document.getElementById('send').addEventListener('click', async () => {
    const url = document.getElementById('url').value.trim();
    let method = document.getElementById('selected-method').textContent.trim();

    if (!url) {
        window.responseEditor.setValue('Please enter a URL');
        return;
    }

    const sendButton = document.getElementById('send');
    const buttonText = document.getElementById('button-text');
    const progressBar = document.getElementById('progress-bar');

    // Set loading state
    sendButton.classList.add('loading-button', 'cursor-not-allowed', 'brightness-90');
    buttonText.textContent = 'Sending...';
    progressBar.style.width = '0';
    progressBar.style.transition = 'width 0.1s linear';
    progressBar.style.backgroundColor = '#F97A00'; // Reset color in case of previous error

    // Start progress animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        if (progress <= 90) {
            progressBar.style.width = `${progress}%`;
        }
    }, 50);

    try {
        // Handle method aliases
        if (method === 'UPDATE') method = 'PUT'; // or 'PATCH' depending on your API

        let editorContent;
        try {
            editorContent = JSON.parse(window.jsonEditor.getValue() || '{}');
        } catch (e) {
            window.responseEditor.setValue('Invalid JSON in editor: ' + e.message);
            throw e; // This will trigger the catch block below
        }

        let headers = {};
        let body = null;
        const selectedTab = document.querySelector('input[name="method-add"]:checked').value;

        if (selectedTab === 'Header') {
            headers = editorContent;
            // Ensure all header values are strings
            headers = Object.fromEntries(
                Object.entries(headers).map(([k, v]) => [k, String(v)])
            );
        } else {
            body = editorContent;
            // Auto-add Content-Type if not specified in headers
            if (!headers['Content-Type'] && !headers['content-type']) {
                headers['Content-Type'] = 'application/json';
            }
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const options = {
            method,
            headers: new Headers(headers),
            signal: controller.signal
        };

        if (body && method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);
        clearTimeout(timeoutId); // Clear timeout if request completes

        let resultText = await res.text();
        let displayOutput;

        try {
            displayOutput = JSON.stringify(JSON.parse(resultText), null, 2);
        } catch {
            displayOutput = resultText;
        }

        window.responseEditor.setValue(displayOutput);
        document.getElementById('status').textContent = `Status: ${res.status} ${res.statusText}`;

        // Complete progress bar
        progressBar.style.width = '100%';

        // Update editor language based on response content-type
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            monaco.editor.setModelLanguage(window.responseEditor.getModel(), 'json');
        } else if (contentType.includes('text/html')) {
            monaco.editor.setModelLanguage(window.responseEditor.getModel(), 'html');
        } else if (contentType.includes('application/xml')) {
            monaco.editor.setModelLanguage(window.responseEditor.getModel(), 'xml');
        } else {
            monaco.editor.setModelLanguage(window.responseEditor.getModel(), 'text');
        }

    } catch (err) {
        let errorMessage = 'Error: ' + err.message;
        if (err.name === 'AbortError') {
            errorMessage = 'Error: Request timed out (30 seconds)';
        }

        window.responseEditor.setValue(errorMessage);
        document.getElementById('status').textContent = 'Status: Error';
        progressBar.style.backgroundColor = '#ff0000';
        progressBar.style.width = '100%';
    } finally {
        // Clean up loading state
        clearInterval(progressInterval);
        setTimeout(() => {
            progressBar.style.width = '0';
            progressBar.style.transition = 'width 0.3s ease';
        }, 300);

        sendButton.classList.remove('loading-button', 'cursor-not-allowed', 'brightness-90');
        buttonText.textContent = 'Send Request';
    }
});

document.getElementById('send').addEventListener('click', async () => {
    const sendButton = document.getElementById('send');
    const buttonText = document.getElementById('button-text');
    const progressBar = document.getElementById('progress-bar');

    // Loading state
    sendButton.classList.add('loading-button', 'cursor-not-allowed', 'brightness-90');
    buttonText.textContent = 'Sending...';
    progressBar.style.transform = 'translateX(-100%)';

    // Smooth animation forward
    let progress = 0;
    const moveBar = setInterval(() => {
        progress += 2; // speed
        if (progress <= 90) {
            progressBar.style.transform = `translateX(${progress - 100}%)`;
        }
    }, 50);

    try {
        // Simulate API call
        await new Promise(res => setTimeout(res, 3000));

        // Complete instantly
        progressBar.style.transform = 'translateX(0%)';

    } catch (err) {
        progressBar.style.backgroundColor = '#ff0000';
        progressBar.style.transform = 'translateX(0%)';
    } finally {
        clearInterval(moveBar);

        setTimeout(() => {
            progressBar.style.transform = 'translateX(-100%)';
        }, 400);

        sendButton.classList.remove('loading-button', 'cursor-not-allowed', 'brightness-90');
        buttonText.textContent = 'Send Request';
    }
});


document.getElementById('url').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send').click();
    }
});

window.jsonEditor = monaco.editor.create(document.getElementById('json-editor'), {
    value: '',
    language: 'json',
    theme: 'vs-light',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14
});

window.responseEditor = monaco.editor.create(document.getElementById('response-editor'), {
    value: '',
    language: 'json',
    theme: 'vs-light',
    readOnly: true,
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14
});
