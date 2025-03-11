document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("commandInput");
  const output = document.getElementById("output");

  if (!output) {
      console.error("ERROR: Output container not found!");
      return;
  }

  // Display initial welcome message
  printMessage("Welcome to Rohit's Terminal Portfolio");
  printMessage("Type 'help' to see available commands.");

  // Listen for Enter key press
  commandInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          const command = commandInput.value.trim();
          if (command !== "") {
              processCommand(command);
              commandInput.value = ""; // Clear input field after command execution
          }
      }
  });

  function processCommand(cmd) {
      console.log("Command entered:", cmd);

      // Create a new line to echo the command
      const newLine = document.createElement("p");
      newLine.textContent = `> ${cmd}`;
      output.appendChild(newLine);

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
              printMessage("1. Fantasy Sports Optimizer\n2. Stock Price Forecasting\n3. Aryabhatta Search\n(Type 'git clone <project>' for GitHub repo)");
              break;
          case "skills":
              printMessage("Python, C++, Machine Learning, Flask, Docker, Streamlit, Next.js, AI Research.");
              break;
          case "experience":
              printMessage("Python Developer at MEGAMINDS IT Services (July 2024 - Sep 2024).");
              break;
          case "contact":
              printMessage("📧 Email: rohitkshirsagar1904@gmail.com\n🔗 LinkedIn: linkedin.com/in/rohitkshirsagar19\n🔗 GitHub: github.com/rohitkshirsagar19");
              break;
          case "download resume":
              window.open("assets/rohit_resume.pdf", "_blank");
              break;
          case "sudo hackathon_winner":
              printMessage("🏆 Access Granted! Hackathon Winner Detected!");
              break;
          case "ls -la":
              printMessage("-rw-r--r-- 1 user user 1234 bytes fun_fact.txt");
              break;
          case "cat fun_fact.txt":
              printMessage("I once built an AI model that predicted IPL winners with 80% accuracy!");
              break;
          case "git clone fantasy_sports":
              window.open("https://github.com/rohitkshirsagar19/fantasy_sports", "_blank");
              break;
          case "git clone stock_price":
              window.open("https://github.com/rohitkshirsagar19/stock_price", "_blank");
              break;
          case "git clone aryabhatta_search":
              window.open("https://github.com/rohitkshirsagar19/aryabhatta_search", "_blank");
              break;
          case "art":
              fetch("assets/ascii-art.txt")
                  .then(response => response.text())
                  .then(text => printMessage(text))
                  .catch(error => printMessage("Error loading ASCII art."));
              break;
          case "play game":
              startSnakeGame();
              break;
          case "theme cyberpunk":
              document.body.classList.remove("retro");
              document.body.classList.add("cyberpunk");
              printMessage("Theme changed to Cyberpunk!");
              break;
          case "theme retro":
              document.body.classList.remove("cyberpunk");
              document.body.classList.add("retro");
              printMessage("Theme changed to Retro!");
              break;
          case "theme default":
              document.body.classList.remove("cyberpunk", "retro");
              printMessage("Theme reset to default!");
              break;
          case "matrix":
              startMatrixEffect();
              break;
          default:
              printMessage(`Command '${cmd}' not recognized. Type 'help' for available commands.`);
      }

      // Scroll to the bottom to show latest command output
      window.scrollTo(0, document.body.scrollHeight);
  }

  // Missing displayHelp function
  function displayHelp() {
      const helpText = `
Available commands:
- help: Display this help message
- about_me: Learn about Rohit
- projects: View coding projects
- skills: See my technical skills
- experience: View my work experience
- contact: Get my contact information
- download resume: Download my resume
- git clone <project>: Open GitHub repository
- ls -la: List files
- play game: Play Snake game
- theme cyberpunk: Change to cyberpunk theme
- theme retro: Change to retro theme
- theme default: Reset to default theme
- matrix: Enter the Matrix
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
              setTimeout(typeWriter, 10); // Adjust typing speed here
          }
      }
      typeWriter();
  }

  // Fixed Matrix Mode Function
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

  // Fixed Snake Game Function
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
      }

      // Start game loop
      gameInterval = setInterval(draw, 150);
  }
});