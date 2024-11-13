const apiKey = "sk-fbsoG0aUePKcflEs8c03Fc8e53D24cEb91A8Ae555870B2D9";
let instructions = "";
let pdfContent = {};
let conversationHistory = [];

// Function to escape special characters
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Load instructions from the file
async function loadInstructions() {
    const response = await fetch('js/instruction.txt');
    instructions = await response.text();
    $('#messages').append(`<div><strong>Bot:</strong> Hi! I'm your assistant bot. How can I help you today? Feel free to ask anything!</div>`);
}

// Load PDF content with keyword mapping
async function loadPDF() {
    const pdfUrl = 'js/Elysium.pdf';
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(pdf => {
        let textPromises = [];
        const keywordIndex = {
            "sensor": [1, 2, 3], // Example: pages related to sensors
            "automation": [4, 5, 6], // Example: pages related to automation
            // Add more keywords and their corresponding pages
        };

        for (let keyword in keywordIndex) {
            textPromises.push(
                Promise.all(keywordIndex[keyword].map(pageNum => 
                    pdf.getPage(pageNum).then(page => {
                        return page.getTextContent().then(textContent => {
                            pdfContent[keyword] = (pdfContent[keyword] || "") + textContent.items.map(item => item.str).join(' ') + "\n";
                        });
                    })
                ))
            );
        }

        return Promise.all(textPromises);
    }).then(() => {
        console.log("PDF content loaded successfully.");
    }).catch(error => {
        console.error("Error loading PDF:", error);
    });
}

$(document).ready(function() {
    loadInstructions(); // Load instructions on page load
    loadPDF(); // Load PDF content on page load

    $('#send-button').click(async function() {
        const userInput = $('#user-input').val();
        if (!userInput) return;  // If input is empty, do nothing

        // Display user message
        $('#messages').append(`<div><strong>User:</strong> ${escapeHtml(userInput)}</div>`);
        $('#user-input').val('');  // Clear input

        // Add user input to conversation history
        conversationHistory.push({ role: "user", content: userInput });

        // Determine relevant keywords from user input
        const keywords = Object.keys(pdfContent).filter(keyword => userInput.toLowerCase().includes(keyword));

        // Prepare the content to send to the API
        const messages = [
            { role: "system", content: instructions },
            ...conversationHistory
        ];

        // Include relevant PDF content if available
        keywords.forEach(keyword => {
            messages.push({ role: "system", content: pdfContent[keyword] });
        });

        // Make API request to OpenAI
        try {
            const response = await fetch("https://api.keyai.shop/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: messages
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const botResponse = data.choices[0].message.content;
            $('#messages').append(`<div><strong>Bot:</strong> ${escapeHtml(botResponse)}</div>`);

            // Add bot response to conversation history
            conversationHistory.push({ role: "assistant", content: botResponse });
        } catch (error) {
            console.error("An error occurred:", error);
            $('#messages').append(`<div><strong>Bot:</strong> Sorry, there was an error processing your request.</div>`);
        }
    });
});