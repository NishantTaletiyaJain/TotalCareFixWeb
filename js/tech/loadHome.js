function techHome() {
    
    var mainSection = document.getElementById('content');
    mainSection.innerHTML = '';

    var homeContent = `
        <section id="home" class="content">
            <div class="row">
                <div class="container">
                    <h2>Your Rating</h2>
                    <p class="details">Rating: <span class="highlight" id="rating">Loading...</span></p>
                </div>
                <div class="container">
                    <h2>Completed Tasks</h2>
                    <p class="details">Tasks Completed: <span class="highlight" id="completed-tasks">Loading...</span></p>
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

    const email = sessionStorage.getItem('email');

    // Fetch the rating
    fetch(`http://localhost:8080/tech/rating/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('rating').innerText = data;
    })
    .catch(error => {
        console.error('Error fetching rating:', error);
        document.getElementById('rating').innerText = 'Error';
    });

    // Fetch the number of completed tasks
    fetch(`http://localhost:8080/tech/taskcompleted/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('completed-tasks').innerText = data;
    })
    .catch(error => {
        console.error('Error fetching completed tasks:', error);
        document.getElementById('completed-tasks').innerText = 'Error';
    });
}
