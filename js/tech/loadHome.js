

function techHome() {
    var mainSection = document.getElementById('content');
    let NumberOfService = 5;
    let Rating = 4.2;
    mainSection.innerHTML = '';
    console.log('home load');
    var homeContent = `
        <section id="home" class="content">
            <div class="row">
                <div class="container">
                    <h2>Service Details</h2>
                    <p class="details">Today's Services: <span class="highlight">${NumberOfService}</span></p>
                </div>
                <div class="container">
                    <h2>Your Rating</h2>
                    <p class="details">Rating: <span class="highlight">${Rating}</span></p>
                </div>
            </div>
        </section>
    `;
    mainSection.innerHTML = homeContent;

    // Add some CSS styles to make the containers and row look nice
    var style = document.createElement('style');
    style.innerHTML = `
        .row {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
        .container {
            flex: 1;
            margin: 0 10px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            background-color: #f9f9f9;
        }
        h2 {
            margin-bottom: 15px;
            font-size: 24px;
            color: #333;
        }
        .details {
            font-size: 18px;
            color: #555;
        }
        .highlight {
            font-weight: bold;
            color: #2c3e50;
        }
    `;
    document.head.appendChild(style);
}

