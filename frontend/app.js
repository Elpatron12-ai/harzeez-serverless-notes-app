// IMPORTANT: Use your API Gateway endpoint
const API_BASE_URL = "https://ydqgst8kok.execute-api.us-east-1.amazonaws.com/dev/notes";

// Create a new note
async function createNote() {
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;

    if (!content.trim()) {
        alert("Note content cannot be empty!");
        return;
    }

    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    const data = await response.json();
    console.log("Created:", data);
    loadNotes(); // Refresh list
}

// Fetch and display notes
async function loadNotes() {
    const response = await fetch(API_BASE_URL);
    const notes = await response.json();

    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <h3>${note.title || "Untitled"}</h3>
            <p>${note.content}</p>
            <small>${note.createdAt}</small>
        `;
        notesList.appendChild(div);
    });
}

// Load notes on page start
window.onload = loadNotes;
