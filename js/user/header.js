function loadHeader() {
    
    var styleElement = document.createElement('style');
    styleElement.id = 'headerStyle'; 
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
    
    
    document.head.appendChild(styleElement);

    
    var headerSection = document.getElementById('head');
    var headerContent = `
        <h1 class="header-item">Total Care Fix</h1>
    `;
    headerSection.innerHTML = headerContent;
}
