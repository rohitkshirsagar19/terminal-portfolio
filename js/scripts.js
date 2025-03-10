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
      document.body.style.background = "black";
      document.body.style.color = "green";
      printMessage("Matrix mode activated... 👨‍💻");
  }
});
