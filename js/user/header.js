function loadHeader() {
    // Dynamically create style element
    var styleElement = document.createElement('style');
    styleElement.id = 'headerStyle'; // Assign an ID for future reference/removal
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
    
    // Append style element to the document head
    document.head.appendChild(styleElement);

    // Now you can manipulate the header as needed
    var headerSection = document.getElementById('head');
    var headerContent = `
        <h1 class="header-item">Total Care Fix</h1>
    `;
    headerSection.innerHTML = headerContent;
}
