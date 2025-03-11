document.addEventListener("DOMContentLoaded", function () {
    const commandInput = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const cursor = document.getElementById("cursor");
    const terminal = document.getElementById("terminal");
  
    if (!output) {
      console.error("ERROR: Output container not found!");
      return;
    }
  
    // Command history
    let commandHistory = [];
    let historyIndex = -1;
    
    // Command suggestions for autocomplete
    const commands = [
      "help", "cls", "about_me", "projects", "skills", "experience", "contact", 
      "download resume", "sudo hackathon_winner", "ls -la", "cat fun_fact.txt", 
      "git clone fantasy_sports", "git clone stock_price", "git clone aryabhatta_search", 
      "art", "play game", "theme cyberpunk", "theme retro", "theme default", "matrix",
      "project fantasy_sports", "project stock_price", "project aryabhatta_search",
      "tech_stack", "contact_form", "share", "coffee"
    ];
    
    // Current autocomplete state
    let autoCompleteIndex = -1;
    let filteredCommands = [];
    
    // Sound effects
    const keyClickSound = new Audio("assets/sounds/success.mp3");
    const commandExecuteSound = new Audio("assets/sounds/success.mp3");
    const errorSound = new Audio("assets/sounds/error.mp3");
    
    // Sound toggle
    let soundEnabled = true;
    
    // Load settings from localStorage if available
    loadSettings();
  
    // Display initial welcome message
    printMessage("Welcome to Rohit's Terminal Portfolio");
    printMessage("Type 'help' to see available commands.");
  
    // Listen for Enter key press and other key events
    commandInput.addEventListener("keydown", function (event) {
      // Handle Enter key to execute commands
      if (event.key === "Enter") {
        const command = commandInput.value.trim();
        if (command !== "") {
          // Add to history and reset history index
          commandHistory.unshift(command);
          if (commandHistory.length > 50) commandHistory.pop(); // Limit history size
          historyIndex = -1;
          saveSettings();
          
          processCommand(command);
          commandInput.value = ""; // Clear input field after command execution
          if (soundEnabled) commandExecuteSound.play();
        }
        return;
      }
  
      // Handle Up/Down arrow keys for command history
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          commandInput.value = commandHistory[historyIndex];
        }
        return;
      }
      
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          commandInput.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
          historyIndex = -1;
          commandInput.value = "";
        }
        return;
      }
      
      // Handle Tab key for autocomplete
      if (event.key === "Tab") {
        event.preventDefault();
        
        const currentInput = commandInput.value.trim();
        
        // If no autocomplete in progress, filter commands based on current input
        if (autoCompleteIndex === -1) {
          filteredCommands = commands.filter(cmd => 
            cmd.startsWith(currentInput) && cmd !== currentInput
          );
        }
        
        // If we have matches, cycle through them
        if (filteredCommands.length > 0) {
          autoCompleteIndex = (autoCompleteIndex + 1) % filteredCommands.length;
          commandInput.value = filteredCommands[autoCompleteIndex];
        }
        
        return;
      }
      
      // Reset autocomplete on any other key
      autoCompleteIndex = -1;
      
      // Play key click sound if enabled
      if (soundEnabled) keyClickSound.play();
    });
    
    // Cursor focus handling
    commandInput.addEventListener("blur", function() {
      cursor.style.opacity = "0.5";
    });
    
    commandInput.addEventListener("focus", function() {
      cursor.style.opacity = "1";
    });
    
    // Click anywhere on terminal to focus input
    terminal.addEventListener("click", function() {
      commandInput.focus();
    });
  
    function processCommand(cmd) {
      console.log("Command entered:", cmd);
  
      // Create a new line to echo the command
      const newLine = document.createElement("p");
      newLine.className = "command-echo";
      newLine.textContent = `> ${cmd}`;
      output.appendChild(newLine);
  
      // Process command
      switch (cmd.toLowerCase()) {
        case "help":
          displayHelp();
          break;
        case "cls":
          clearScreen();
          break;
        case "about_me":
          printMessage("I am Rohit Kshirsagar, a BTech student in AI & Data Science. Passionate about Machine Learning, AI, and Full-Stack Development.");
          break;
        case "projects":
          printMessage("1. Fantasy Sports Optimizer\n2. Stock Price Forecasting\n3. Aryabhatta Search\n(Type 'project <name>' for details or 'git clone <project>' for GitHub repo)");
          break;
        case "skills":
          printMessage("Python, C++, Machine Learning, Flask, Docker, Streamlit, Next.js, AI Research.");
          break;
        case "experience":
          printMessage("Python Developer at MEGAMINDS IT Services (July 2024 - Sep 2024).");
          break;
        case "contact":
          displayContactInfo();
          break;
        case "contact_form":
          displayContactForm();
          break;
        case "download resume":
          window.open("assets/rohit_resume.pdf", "_blank");
          break;
        case "sudo hackathon_winner":
          printMessage("🏆 Access Granted! Hackathon Winner Detected!");
          break;
        case "ls -la":
          printMessage("-rw-r--r-- 1 user user 1234 bytes fun_fact.txt\n-rw-r--r-- 1 user user 2345 bytes .secret");
          break;
        case "cat fun_fact.txt":
          printMessage("I once built an AI model that predicted IPL winners with 80% accuracy!");
          break;
        case "cat .secret":
          printMessage("You found a secret! Type 'coffee' for a surprise.");
          break;
        case "git clone fantasy_sports":
          window.open("", "_blank");
          break;
        case "git clone stock_price":
          window.open("", "_blank");
          break;
        case "git clone aryabhatta_search":
          window.open("", "_blank");
          break;
        case "project fantasy_sports":
          displayProjectDetails("fantasy_sports");
          break;
        case "project stock_price":
          displayProjectDetails("stock_price");
          break;
        case "project aryabhatta_search":
          displayProjectDetails("aryabhatta_search");
          break;
        case "tech_stack":
          displayTechStack();
          break;
        case "art":
          fetch("assets/ascii-art.txt")
            .then(response => response.text())
            .then(text => printMessage(text))
            .catch(error => printMessage("Error loading ASCII art."));
          break;
        case "coffee":
          displayCoffeeEasterEgg();
          break;
        case "play game":
          startSnakeGame();
          break;
        case "theme cyberpunk":
          document.body.classList.remove("retro");
          document.body.classList.add("cyberpunk");
          printMessage("Theme changed to Cyberpunk!");
          saveSettings();
          break;
        case "theme retro":
          document.body.classList.remove("cyberpunk");
          document.body.classList.add("retro");
          printMessage("Theme changed to Retro!");
          saveSettings();
          break;
        case "theme default":
          document.body.classList.remove("cyberpunk", "retro");
          printMessage("Theme reset to default!");
          saveSettings();
          break;
        case "matrix":
          startMatrixEffect();
          break;
        case "sound on":
          soundEnabled = true;
          printMessage("Sound effects enabled.");
          saveSettings();
          break;
        case "sound off":
          soundEnabled = false;
          printMessage("Sound effects disabled.");
          saveSettings();
          break;
        case "share":
          shareTerminal();
          break;
        default:
          if (soundEnabled) errorSound.play();
          printMessage(`Command '${cmd}' not recognized. Type 'help' for available commands.`);
      }
  
      // Scroll to the bottom to show latest command output
      window.scrollTo(0, document.body.scrollHeight);
    }
  
    // Function to display project details
    function displayProjectDetails(projectName) {
      let details = "";
      
      switch(projectName) {
        case "fantasy_sports":
          details = `
═══════════════════════════════════════════════
  📊 Fantasy Sports Optimization Algorithm
═══════════════════════════════════════════════

📝 Description:
An AI-driven optimization model that automates fantasy team selection with higher accuracy than rule-based systems.

🛠️ Technologies:
- Python (XGBoost, PuLP, scikit-learn, pandas)
- Flask
- Docker
- MLOps

🔑 Key Features:
- AI-based player performance prediction
- Multi-constraint team optimization algorithm
- Budget and role-based selection
- ESPN data integration via web scraping
- Automated weekly model retraining

// 🔗 GitHub: github.com/rohitkshirsagar19
// 🔗 Demo: [Live Demo Link]

// 💡 My Role:
// Lead developer responsible for model implementation, backend API, and deployment pipeline.

  `;
          break;
        case "stock_price":
          details = `
═══════════════════════════════════════════════
  📈 Stock Price Forecasting
═══════════════════════════════════════════════

📝 Description:
A web application for predicting stock price trends using historical data and visualization tools.

🛠️ Technologies:
- Python (scikit-learn, pandas)
- Streamlit
- YFinance API
- Matplotlib
- Plotly

🔑 Key Features:
- Linear regression-based price prediction
- Real-time stock data retrieval via YFinance API
- Interactive trend visualization
- Historical performance analysis

// 🔗 GitHub: github.com/rohitkshirsagar19
// 🔗 Demo: [Live Demo Link]

// 💡 My Role:
// Developed the prediction model, data retrieval pipeline, and interactive dashboard.

  `;
          break;
        case "aryabhatta_search":
          details = `
═══════════════════════════════════════════════
  🔍 Aryabhatta Search
═══════════════════════════════════════════════

📝 Description:
An AI-powered educational search platform that personalizes academic content and learning resources.

🛠️ Technologies:
- Python
- Next.js
- TypeScript
- Supabase
- Groq LLM
- Google Custom Search API

🔑 Key Features:
- AI-driven search results for academic queries
- Tailored summaries and book recommendations
- Google Custom Search integration
- Multi-level content personalization

// 🔗 GitHub: github.com/rohitkshirsagar19
// 🔗 Demo: [Live Demo Link]

// 💡 My Role:
// Developed the search algorithm, backend logic, and integrated AI-powered search features.

  `;
          break;
        default:
          details = "Project details not found. Available projects: fantasy_sports, stock_price, aryabhatta_search";
      }
      
      printMessage(details);
    }
    
    // Function to display tech stack
    function displayTechStack() {
      const techStack = `
  ╔═══════════════════════════════════════════════════════╗
  ║                  🚀 TECH STACK                        ║
  ╚═══════════════════════════════════════════════════════╝
  
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ LANGUAGES ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Python       
  C++          
  C            
  SQL          
  HTML/CSS     
  JavaScript   
  TypeScript   

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ FRAMEWORKS & LIBRARIES ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Flask        
  Streamlit    
  NumPy        
  Pandas       
  Scikit-learn 
  XGBoost      
  PuLP         
  Matplotlib   
  Plotly       
  Seaborn      
  YFinance     
  Next.js      
  Prisma       

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ TOOLS & PLATFORMS ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  Git          
  Docker       
  VS Code      
  PyCharm      
  Google Colab 
  MLOps        
  Supabase     
  Google Custom Search API  
  Groq         
  `;
  
      printMessage(techStack);
    }
    
    // Function to display contact info with clickable links
    function displayContactInfo() {
      const contactDiv = document.createElement("div");
      contactDiv.className = "contact-info";
      contactDiv.innerHTML = `
        <p>📧 Email: <a href="mailto:rohitkshirsagar1904@gmail.com" class="contact-link">rohitkshirsagar1904@gmail.com</a></p>
        <p>🔗 LinkedIn: <a href="https://linkedin.com/in/rohitkshirsagar19" target="_blank" class="contact-link">linkedin.com/in/rohitkshirsagar19</a></p>
        <p>🔗 GitHub: <a href="https://github.com/rohitkshirsagar19" target="_blank" class="contact-link">github.com/rohitkshirsagar19</a></p>
        <p>Type 'contact_form' to send me a message directly.</p>
      `;
      output.appendChild(contactDiv);
    }
    
    // Function to display contact form
    // Function to display contact form
function displayContactForm() {
  const formDiv = document.createElement("div");
  formDiv.className = "contact-form";
  formDiv.innerHTML = `
    <form id="messageForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" rows="4" required></textarea>
      </div>
      <button type="submit" class="form-button">Send</button>
      <button type="button" class="form-button cancel-button">Cancel</button>
    </form>
  `;
  output.appendChild(formDiv);
  
  // Stop propagation of click events in the form to prevent terminal clicks
  const messageForm = document.getElementById("messageForm");
  messageForm.addEventListener("click", function(e) {
    e.stopPropagation();
  });
  
  // Make sure the form fields can receive focus
  const formInputs = messageForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener("click", function(e) {
      e.stopPropagation();
    });
    
    input.addEventListener("focus", function(e) {
      // Hide the cursor when form fields are focused
      cursor.style.opacity = "0";
    });
    
    input.addEventListener("blur", function(e) {
      // Show the cursor when form fields lose focus
      cursor.style.opacity = "1";
    });
  });
  
  // Form submission handler
  messageForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      printMessage("Please fill out all fields.");
      return;
    }
    if (!email.includes("@")) {
      printMessage("Please enter a valid email.");
      return;
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    
    // Send to FormSubmit.co service which will email you
    fetch('https://formsubmit.co/rohitkshirsagar1904@gmail.com', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      formDiv.remove();
      printMessage(`Message sent successfully! Thank you, ${name}. I'll get back to you soon.`);
      commandInput.focus();
    })
    .catch(error => {
      formDiv.remove();
      printMessage("There was an error sending your message. Please try again later.");
      commandInput.focus();
      console.error('Error:', error);
    });
  });
  
  // Cancel button handler
  formDiv.querySelector(".cancel-button").addEventListener("click", function(e) {
    e.stopPropagation();
    formDiv.remove();
    printMessage("Message canceled.");
    
    // Re-focus command input after cancellation
    commandInput.focus();
  });
}
    
    // Coffee easter egg
    function displayCoffeeEasterEgg() {
      const coffeeArt = `
          ( (
           ) )
        .______.
        |      |]
        \\      /
         '----'
      
      ☕ Thanks for finding this easter egg! ☕
      Your virtual coffee is served.
      `;
      
      printMessage(coffeeArt);
    }
    
    // Function to share terminal
    function shareTerminal() {
      // Create a snapshot of current terminal content
      const snapshot = document.createElement("div");
      snapshot.className = "terminal-snapshot";
      
      // Clone current output
      const outputClone = output.cloneNode(true);
      snapshot.appendChild(outputClone);
      
      // Create options for sharing
      const shareOptions = document.createElement("div");
      shareOptions.className = "share-options";
      shareOptions.innerHTML = `
        <p>Share Options:</p>
        <button id="copyText" class="share-button">Copy as Text</button>
        <button id="downloadHTML" class="share-button">Download as HTML</button>
        <button id="cancelShare" class="share-button cancel-button">Cancel</button>
      `;
      
      output.appendChild(shareOptions);
      
      // Copy text handler
      document.getElementById("copyText").addEventListener("click", function() {
        const textContent = Array.from(output.querySelectorAll("p, pre"))
          .map(el => el.textContent)
          .join("\n")
          .replace(/Share Options:.*Cancel/s, ""); // Remove share options from text
        
        navigator.clipboard.writeText(textContent).then(() => {
          shareOptions.remove();
          printMessage("Terminal content copied to clipboard!");
        });
      });
      
      // Download HTML handler
      document.getElementById("downloadHTML").addEventListener("click", function() {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Rohit's Terminal - Snapshot</title>
            <style>
              body { background: #0d0d0d; color: #00ff00; font-family: monospace; padding: 20px; }
              .terminal { background: rgba(17, 17, 17, 0.9); border: 2px solid #00ff00; padding: 20px; max-width: 800px; margin: 0 auto; }
              p, pre { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="terminal">
              ${output.innerHTML.replace(/Share Options:.*Cancel<\/button><\/div>/s, "")}
            </div>
          </body>
          </html>
        `;
        
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "terminal-snapshot.html";
        a.click();
        URL.revokeObjectURL(url);
        
        shareOptions.remove();
        printMessage("Terminal snapshot downloaded as HTML!");
      });
      
      // Cancel handler
      document.getElementById("cancelShare").addEventListener("click", function() {
        shareOptions.remove();
        printMessage("Share operation canceled.");
      });
    }
  
    // Function to display help
    function displayHelp() {
      const helpText = `
  Available commands:
  ==================
  
  NAVIGATION & BASIC COMMANDS
  ---------------------------
  help          - Display this help message
  cls           - Clear the terminal screen
  about_me      - Learn about Rohit
  projects      - View my coding projects
  skills        - See my technical skills
  experience    - View my work experience
  tech_stack    - Display detailed tech stack with proficiency levels
  
  PROJECT & REPOSITORY COMMANDS
  ----------------------------
  project <name> - View detailed information about a specific project
  
  CONTACT & COMMUNICATION
  ----------------------
  contact       - Get my contact information with clickable links
  contact_form  - Display a form to send me a message directly
  download resume - Download my resume as PDF
  
  VISUAL & EXPERIENCE CUSTOMIZATION
  --------------------------------
  theme cyberpunk - Change to cyberpunk theme
  theme retro     - Change to retro theme
  theme default   - Reset to default theme
  sound on        - Enable terminal sound effects
  sound off       - Disable terminal sound effects
  matrix          - Enter the Matrix
  play game       - Play Snake game
  share           - Share or export terminal content
  
  COMMON TERMINAL COMMANDS
  -----------------------
  ls -la         - List all files (including hidden ones)
  cat <filename> - Display the contents of a file
  
  TIPS
  ----
  - Use Tab key for command autocompletion
  - Use Up/Down arrows to navigate command history
  - There may be hidden easter eggs to discover...
  `;
      printMessage(helpText);
    }
  
    // Function to clear the terminal screen
    function clearScreen() {
      output.innerHTML = ""; // Clears all messages from the output area
      printMessage("Terminal cleared. Type 'help' for available commands.");
    }
  
    // Function to print messages to the terminal output (with typing effect)
    function printMessage(msg) {
      const responseLine = document.createElement("pre"); 
      output.appendChild(responseLine);
  
      let i = 0;
      function typeWriter() {
        if (i < msg.length) {
          responseLine.textContent += msg.charAt(i);
          i++;
          setTimeout(typeWriter, 5); // Faster typing speed
        }
      }
      typeWriter();
    }
  
    // Function to save settings to localStorage
    function saveSettings() {
      const settings = {
        theme: document.body.className,
        soundEnabled: soundEnabled,
        commandHistory: commandHistory
      };
      
      localStorage.setItem('terminalSettings', JSON.stringify(settings));
    }
    
    // Function to load settings from localStorage
    function loadSettings() {
      const settings = JSON.parse(localStorage.getItem('terminalSettings'));
      
      if (settings) {
        // Apply theme
        if (settings.theme) {
          document.body.className = settings.theme;
        }
        
        // Apply sound settings
        if (typeof settings.soundEnabled !== 'undefined') {
          soundEnabled = settings.soundEnabled;
        }
        
        // Load command history
        if (settings.commandHistory && Array.isArray(settings.commandHistory)) {
          commandHistory = settings.commandHistory;
        }
      }
    }
  
    // Matrix Mode Function
    function startMatrixEffect() {
      let canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "999";
      document.body.appendChild(canvas);
      
      let ctx = canvas.getContext("2d");
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      let matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".split("");
      let fontSize = 16;
      let columns = Math.floor(canvas.width / fontSize);
      let drops = Array(columns).fill(1);
  
      // Store original terminal visibility state
      const terminal = document.getElementById("terminal");
      const originalDisplay = terminal.style.display;
      terminal.style.display = "none";
  
      function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";
  
        for (let i = 0; i < drops.length; i++) {
          let text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
  
      let matrixInterval = setInterval(drawMatrix, 50);
      
      // Add exit message
      const messageDiv = document.createElement("div");
      messageDiv.textContent = "Press ESC to exit Matrix mode";
      messageDiv.style.position = "fixed";
      messageDiv.style.bottom = "20px";
      messageDiv.style.left = "50%";
      messageDiv.style.transform = "translateX(-50%)";
      messageDiv.style.color = "#0F0";
      messageDiv.style.fontFamily = "monospace";
      messageDiv.style.zIndex = "1000";
      document.body.appendChild(messageDiv);
  
      // Handle ESC key properly
      function exitMatrixHandler(event) {
        if (event.key === "Escape") {
          clearInterval(matrixInterval);
          document.body.removeChild(canvas);
          document.body.removeChild(messageDiv);
          terminal.style.display = originalDisplay;
          document.removeEventListener("keydown", exitMatrixHandler);
        }
      }
      
      document.addEventListener("keydown", exitMatrixHandler);
    }
  
    // Snake Game Function
    function startSnakeGame() {
      // Store original terminal visibility state
      const terminal = document.getElementById("terminal");
      const originalDisplay = terminal.style.display;
      terminal.style.display = "none";
      
      // Create game container
      const gameContainer = document.createElement("div");
      gameContainer.style.position = "fixed";
      gameContainer.style.top = "50%";
      gameContainer.style.left = "50%";
      gameContainer.style.transform = "translate(-50%, -50%)";
      gameContainer.style.zIndex = "1000";
      document.body.appendChild(gameContainer);
      
      // Create canvas
      let canvas = document.createElement("canvas");
      gameContainer.appendChild(canvas);
      let ctx = canvas.getContext("2d");
  
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.border = "2px solid #0F0";
      canvas.style.backgroundColor = "black";
  
      // Add message
      const messageDiv = document.createElement("div");
      messageDiv.textContent = "Use arrow keys to move. Press ESC to exit.";
      messageDiv.style.color = "#0F0";
      messageDiv.style.fontFamily = "monospace";
      messageDiv.style.textAlign = "center";
      messageDiv.style.marginTop = "10px";
      gameContainer.appendChild(messageDiv);
  
      // Game variables
      let box = 20;
      let snake = [{ x: 10 * box, y: 10 * box }];
      let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
      let direction = "RIGHT";
      let score = 0;
      let gameInterval;
  
      function draw() {
        // Clear canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);
        
        // Draw snake
        for (let i = 0; i < snake.length; i++) {
          ctx.fillStyle = i === 0 ? "lime" : "green";
          ctx.fillRect(snake[i].x, snake[i].y, box, box);
          ctx.strokeStyle = "darkgreen";
          ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        
        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
        
        // Old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        // Move snake based on direction
        if (direction === "LEFT") snakeX -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "UP") snakeY -= box;
        if (direction === "DOWN") snakeY += box;
        
        // Check for collision with walls
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
          gameOver();
          return;
        }
        
        // Check for collision with self
        for (let i = 1; i < snake.length; i++) {
          if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver();
            return;
          }
        }
        
        // Check if food eaten
        if (snakeX === food.x && snakeY === food.y) {
          score++;
          food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
          };
          // Don't remove tail when food is eaten
        } else {
          // Remove the tail
          snake.pop();
        }
        
        // Add new head
        let newHead = {
          x: snakeX,
          y: snakeY
        };
        
        snake.unshift(newHead);
      }
  
      function gameOver() {
        clearInterval(gameInterval);
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("Press ESC to exit", canvas.width / 2, canvas.height / 2 + 80);
      }
  

    // Handle direction changes
    function changeDirection(event) {
        if (event.key === "ArrowLeft" && direction !== "RIGHT") {
          direction = "LEFT";
        } else if (event.key === "ArrowRight" && direction !== "LEFT") {
          direction = "RIGHT";
        } else if (event.key === "ArrowUp" && direction !== "DOWN") {
          direction = "UP";
        } else if (event.key === "ArrowDown" && direction !== "UP") {
          direction = "DOWN";
        } else if (event.key === "Escape") {
          exitGame();
        }
      }
      
      document.addEventListener("keydown", changeDirection);
  
      function exitGame() {
        clearInterval(gameInterval);
        document.removeEventListener("keydown", changeDirection);
        document.body.removeChild(gameContainer);
        terminal.style.display = originalDisplay;
        
        // Focus the command input when returning to terminal
        commandInput.focus();
      }
  
      // Start game loop
      gameInterval = setInterval(draw, 150);
    }
    
    // Additional CSS for new features
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Contact Form Styles */
      .contact-form {
        background-color: rgba(0, 50, 0, 0.7);
        padding: 15px;
        border: 1px solid #0f0;
        margin: 10px 0;
        max-width: 500px;
      }
      
      .form-group {
        margin-bottom: 10px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 5px;
        color: #0f0;
      }
      
      .form-group input, .form-group textarea {
        width: 100%;
        padding: 8px;
        background-color: #000;
        color: #0f0;
        border: 1px solid #0f0;
        font-family: monospace;
      }
      
      .form-button {
        background-color: #0f0;
        color: #000;
        border: none;
        padding: 8px 15px;
        margin-right: 10px;
        cursor: pointer;
        font-family: monospace;
        transition: all 0.3s;
      }
      
      .form-button:hover {
        background-color: #00aa00;
      }
      
      .cancel-button {
        background-color: #333;
        color: #0f0;
      }
      
      .cancel-button:hover {
        background-color: #555;
      }
      
      /* Contact Links */
      .contact-link {
        color: #0ff;
        text-decoration: underline;
        cursor: pointer;
      }
      
      .contact-link:hover {
        color: #fff;
      }
      
      /* Share Options */
      .share-options {
        background-color: rgba(0, 50, 0, 0.7);
        padding: 15px;
        border: 1px solid #0f0;
        margin: 10px 0;
      }
      
      .share-button {
        background-color: #0f0;
        color: #000;
        border: none;
        padding: 8px 15px;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
        font-family: monospace;
        transition: all 0.3s;
      }
      
      /* Command Echo */
      .command-echo {
        color: #0f0;
        margin: 5px 0;
      }
      
      /* Custom Cursor */
      #cursor {
        display: inline-block;
        width: 10px;
        height: 20px;
        background-color: #0f0;
        animation: blink 1s infinite;
        vertical-align: bottom;
        margin-left: 5px;
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(styleElement);
    
    // Focus input on initial load
    commandInput.focus();
  });