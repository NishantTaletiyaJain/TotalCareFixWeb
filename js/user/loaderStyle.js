// function addLoaderStyles() {
//     var style = document.createElement('style');
//     style.id = 'fullScreenLoaderStyles';
//     var css = `

//         .loader {
//             display: none;
//             position: fixed;
//             z-index: 9999;
//             left: 0;
//             top: 0;
//             width: 100%;
//             height: 100%;
//             overflow: hidden;
//             background-color: rgba(0, 0, 0, 0.5);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }
        
//         .spinner {
//             border: 1.5vw solid #f3f3f3;
//             border-top: 1.5vw solid #3498db;
            
//             border-radius: 50%;
//             width: 10vw;
//             height: 10vw;
//             animation: spin 2s linear infinite;
//         }
        
//         @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//         }
    

//         /* Full-screen loader styles */
//         #fullScreenLoader {
//             display: none; /* Hidden by default */
//             position: fixed; /* Stay in place */
//             z-index: 9999; /* Sit on top */
//             left: 0;
//             top: 0;
//             width: 100%;
//             height: 100%;
//             background-color: rgba(0, 0, 0, 0.5); /* Black background with transparency */
//             display: flex; /* Flexbox for centering */
//             align-items: center; /* Center items vertically */
//             justify-content: center; /* Center items horizontally */
//         }

//         .spinner {
//             border: 1.5vw solid #f3f3f3; /* Light grey */
//             border-top: 1.5vw solid #3498db; /* Blue */
//             border-radius: 50%;
//             width: 10vw;
//             height: 10vw;
//             animation: spin 2s linear infinite;
//         }

//         @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//         }
//     `;
//     style.appendChild(document.createTextNode(css));
//     document.head.appendChild(style);
// }