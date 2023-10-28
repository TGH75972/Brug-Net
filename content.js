let bugButton;
let firstInterfaceDiv;
let secondInterfaceDiv;

document.addEventListener("mouseup", function(event) {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText && !isInsideInterface(event.target)) {
        if (!bugButton) {
            bugButton = document.createElement("button");
            bugButton.style.position = "absolute";
            bugButton.style.width = "24px";
            bugButton.style.height = "24px";
            bugButton.style.fontSize = "20px";
            bugButton.style.lineHeight = "24px";
            bugButton.style.textAlign = "center";
            bugButton.style.background = "transparent";
            bugButton.style.border = "none";
            bugButton.style.cursor = "pointer";
            bugButton.textContent = "🐞";

            document.body.appendChild(bugButton);
        }

        bugButton.style.top = event.pageY + "px";
        bugButton.style.left = event.pageX + "px";

        bugButton.addEventListener("click", function(event) {
            event.stopPropagation();
            bugButton.remove();
            firstInterfaceDiv = createFirstInterface(selectedText, event.pageX, event.pageY);
        });
    } else {
        if (bugButton) {
            bugButton.remove();
            bugButton = null;
        }
        if (firstInterfaceDiv) {
            firstInterfaceDiv.remove();
            firstInterfaceDiv = null;
        }
        if (secondInterfaceDiv) {
            secondInterfaceDiv.remove();
            secondInterfaceDiv = null;
        }
    }
});

function createFirstInterface(selectedText, posX, posY) {
    const interfaceDiv = document.createElement("div");
    interfaceDiv.style.position = "absolute";
    interfaceDiv.style.top = posY + "px";
    interfaceDiv.style.left = posX + "px";
    interfaceDiv.style.background = "grey";
    interfaceDiv.style.padding = "10px";
    interfaceDiv.style.borderRadius = "10px";
    interfaceDiv.style.userSelect = "none"; // Disable text selection inside the interface
    interfaceDiv.className = "firstInterfaceDiv"; // Add a class to the first interface

    const vulnerableCodeLabel = document.createElement("div");
    vulnerableCodeLabel.innerText = "Vulnerable Code";
    vulnerableCodeLabel.style.fontFamily = "Verdana, sans-serif";
    vulnerableCodeLabel.style.fontWeight = "bold";
    vulnerableCodeLabel.style.color = "black";
    vulnerableCodeLabel.style.marginBottom = "5px";
    interfaceDiv.appendChild(vulnerableCodeLabel);

    const vulnerableCodeInput = document.createElement("textarea");
    vulnerableCodeInput.value = selectedText;
    vulnerableCodeInput.rows = 4;
    vulnerableCodeInput.cols = 40;
    vulnerableCodeInput.style.overflowY = "auto";
    vulnerableCodeInput.style.marginBottom = "10px";
    vulnerableCodeInput.style.borderRadius = "10px";
    interfaceDiv.appendChild(vulnerableCodeInput);

    const descriptionLabel = document.createElement("div");
    descriptionLabel.innerText = "Description";
    descriptionLabel.style.fontFamily = "Verdana, sans-serif";
    descriptionLabel.style.fontWeight = "bold";
    descriptionLabel.style.color = "black";
    descriptionLabel.style.marginBottom = "5px";
    interfaceDiv.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.rows = 4;
    descriptionInput.cols = 40;
    descriptionInput.style.overflowY = "auto";
    descriptionInput.style.marginBottom = "10px";
    descriptionInput.style.borderRadius = "10px";
    descriptionInput.style.float = "left"; // Align to the left
    interfaceDiv.appendChild(descriptionInput);

    const postButton = document.createElement("button");
    postButton.innerText = "Post";
    postButton.style.backgroundColor = "lightgreen";
    postButton.style.color = "black";
    postButton.style.border = "none";
    postButton.style.cursor = "pointer";
    postButton.style.fontFamily = "Verdana, sans-serif";
    postButton.style.marginTop = "10px";
    postButton.style.borderRadius = "10px";
    postButton.style.marginLeft = "10px";
    postButton.style.float = "left"; // Align to the left
    interfaceDiv.appendChild(postButton);

    const changeButton = document.createElement("button");
    changeButton.innerText = "Change";
    changeButton.style.backgroundColor = "lightgreen";
    changeButton.style.color = "black";
    changeButton.style.border = "none";
    changeButton.style.cursor = "pointer";
    changeButton.style.fontFamily = "Verdana, sans-serif";
    changeButton.style.marginTop = "10px"; // Adjust the margin-top value as needed
    changeButton.style.borderRadius = "10px";
    changeButton.style.marginLeft = "10px";
    changeButton.style.float = "left"; // Align to the left
    interfaceDiv.appendChild(changeButton);

    changeButton.addEventListener("click", function() {
        interfaceDiv.remove(); // Remove the interfaceDiv from the document
    });

    postButton.addEventListener("click", function() {
        // Logic for posting the data from the first interface
        // You can implement your own logic here

        // Close the first interface
        interfaceDiv.remove();

        // Generate auth token
        const authToken = generateAuthToken(5);

        // Open the second interface at the same position as the first interface
        secondInterfaceDiv = createSecondInterface(authToken, posX, posY);
    });

    document.body.appendChild(interfaceDiv);
    return interfaceDiv;
}

function createSecondInterface(authToken, posX, posY) {
    const secondInterfaceDiv = document.createElement("div");
    secondInterfaceDiv.style.position = "absolute";
    secondInterfaceDiv.style.top = posY + "px";
    secondInterfaceDiv.style.left = posX + "px";
    secondInterfaceDiv.style.background = "grey";
    secondInterfaceDiv.style.padding = "10px";
    secondInterfaceDiv.style.borderRadius = "10px";
    secondInterfaceDiv.style.userSelect = "none"; // Disable text selection inside the interface
    secondInterfaceDiv.className = "secondInterfaceDiv"; // Add a class to the second interface

    const authTokenLabel = document.createElement("div");
    authTokenLabel.innerText = "Auth Token:";
    authTokenLabel.style.fontFamily = "Verdana, sans-serif";
    authTokenLabel.style.fontWeight = "bold";
    authTokenLabel.style.color = "black";
    authTokenLabel.style.marginBottom = "5px";
    secondInterfaceDiv.appendChild(authTokenLabel);

    const authTokenValue = document.createElement("div");
    authTokenValue.innerText = authToken;
    authTokenValue.style.fontFamily = "Verdana, sans-serif";
    authTokenValue.style.color = "black";
    authTokenValue.style.marginBottom = "10px";
    secondInterfaceDiv.appendChild(authTokenValue);

    const linkLabel = document.createElement("div");
    linkLabel.innerText = "Web Server Link:";
    linkLabel.style.fontFamily = "Verdana, sans-serif";
    linkLabel.style.fontWeight = "bold";
    linkLabel.style.color = "black";
    linkLabel.style.marginBottom = "5px";
    secondInterfaceDiv.appendChild(linkLabel);

    const linkValue = document.createElement("div");
    linkValue.innerText = "https://your-web-server-link/" + authToken;
    linkValue.style.fontFamily = "Verdana, sans-serif";
    linkValue.style.color = "black";
    linkValue.style.marginBottom = "10px";
    secondInterfaceDiv.appendChild(linkValue);

    document.body.appendChild(secondInterfaceDiv);
    return secondInterfaceDiv;
}

function generateAuthToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let authToken = '';
    for (let i = 0; i < length; i++) {
        authToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return authToken;
}

function isInsideInterface(target) {
    // Check if the target or its parent elements have the 'firstInterfaceDiv' class
    while (target) {
        if (target.classList && target.classList.contains("firstInterfaceDiv")) {
            return true;
        }
        target = target.parentNode;
    }
    return false;
}
