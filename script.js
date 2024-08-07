function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();

    if (task) {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="todo.png" alt="Task Icon" class="task-icon">
            ${task}
            <button class="remove-btn" onclick="removeTask(this)">&#10005;</button>
        `;
        taskList.appendChild(listItem);
        input.value = '';
    }
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(button.parentElement);
}

function downloadListAsPDF() {
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Fetch all list items
    const taskList = document.getElementById('taskList');
    const listItems = taskList.querySelectorAll('li');
    
    let y = 10; // Y coordinate for text placement

    listItems.forEach((item, index) => {
        if (y > 270) { // Check if the content goes beyond the page margin
            pdf.addPage();
            y = 10; // Reset Y coordinate for the new page
        }
        
        pdf.setFontSize(12);
        pdf.text(item.textContent.trim(), 10, y);
        y += 10; // Move down for the next item
    });

    pdf.save('colorful-todo-list.pdf');
}
