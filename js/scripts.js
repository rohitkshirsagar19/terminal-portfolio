document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("commandInput");
  const output = document.getElementById("output");

  if (!output) {
      console.error("ERROR: Output container not found!");
      return;
  }

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
          case "art":
              fetch("assets/ascii-art.txt")
                  .then(response => response.text())
                  .then(text => printMessage(text));
              break;
          case "play game":
              window.open("assets/game.js", "_blank");
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
          case "matrix":
              startMatrixEffect();
              break;
          default:
              printMessage(`Command '${cmd}' not recognized. Type 'help' for available commands.`);
      }

      window.scrollTo(0, document.body.scrollHeight);
  }

  // Function to clear the terminal screen
  function clearScreen() {
      output.innerHTML = ""; // Clears all messages from the output area
      printMessage("Terminal cleared. Type 'help' for available commands.");
  }

  // Function to print messages to the terminal output
  function printMessage(msg) {
      console.log("Printing message:", msg);

      const responseLine = document.createElement("p");
      responseLine.textContent = msg;
      output.appendChild(responseLine);
  }

  // Function to display help menu
  function displayHelp() {
      console.log("Help function executed!");
      printMessage("Available Commands:\n- about_me\n- projects\n- skills\n- experience\n- contact\n- download resume\n- sudo hackathon_winner\n- ls -la\n- cat fun_fact.txt\n- git clone <project>\n- art\n- play game\n- theme cyberpunk\n- theme retro\n- matrix\n- cls");
  }

  // Function to activate Matrix Mode
  function startMatrixEffect() {
    // Create a full-screen canvas
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    let matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    matrixChars = matrixChars.split("");

    // Set font size and columns
    let fontSize = 16;
    let columns = canvas.width / fontSize;

    // Array to store drop positions
    let drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Function to draw matrix rain
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Transparent black background for fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Green text
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

    // Set interval to continuously draw the effect
    setInterval(drawMatrix, 50);

    // Hide the terminal UI temporarily
    document.getElementById("terminal").style.display = "none";

    printMessage("Matrix mode activated... Press 'ESC' to exit.");
    
    // Listen for ESC key to exit matrix mode
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            // Remove canvas and restore terminal UI
            document.body.removeChild(canvas);
            document.getElementById("terminal").style.display = "block";
        }
    });
}

});
