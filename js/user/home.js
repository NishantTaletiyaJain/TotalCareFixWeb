function loadHome() {

    var mainSection = document.getElementById('content');
    mainSection.innerHTML=''
    console.log('home load');
    var homeContent = `
        <section id="home" class="content">
            <img src="./images/userbanner.jpg" width="100%" height="100%" />
            
        </section>
    `;


    mainSection.innerHTML = homeContent;
}