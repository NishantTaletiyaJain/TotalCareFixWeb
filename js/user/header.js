function loadHeader() {
    // Dynamically create style element
    var styleElement = document.createElement('style');
    styleElement.innerHTML = `
        header {
            background-color: rgb(218, 215, 215);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
            color: black;
        }
    `;
    
    // Dynamically create script element
    var scriptElement = document.createElement('script');
    scriptElement.innerHTML = `
        function loadUserDashboard() {
            // Your code for loading the user dashboard goes here
        }
    `;
    
    // Append style and script elements to the document head
    document.head.appendChild(styleElement);
    document.head.appendChild(scriptElement);

    // Now you can manipulate the header as needed
    var headerSection = document.getElementById('head');
    var headerContent = `
        <h1 class="header-item">Total Care Fix</h1>
    `;
    headerSection.innerHTML = headerContent;
}