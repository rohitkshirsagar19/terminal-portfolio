// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const commandInput = document.getElementById('commandInput');
    const output = document.getElementById('output');
    
    // Listen for the "Enter" key on the input field
    commandInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const command = commandInput.value.trim();
        if (command !== "") {
          processCommand(command);
          commandInput.value = ""; // Clear the input after processing
        }
      }
    });
    
    // Function to process and display the command
    function processCommand(cmd) {
      // Create a new line to echo the command
      const newLine = document.createElement('p');
      newLine.textContent = `> ${cmd}`;
      output.appendChild(newLine);
      
      // For now, respond with a default message
      const responseLine = document.createElement('p');
      responseLine.textContent = `Command '${cmd}' not recognized. Type 'help' for available commands.`;
      output.appendChild(responseLine);
      
      // Auto-scroll to the bottom of the page
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
  