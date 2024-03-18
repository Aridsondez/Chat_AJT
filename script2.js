


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");
    const emails= document.getElementById("email");
    const password = document.getElementById("password");

    

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        app.auth().signInWithEmailAndPassword(emails.value, password.value)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("User signed in:", user);
                console.log(emails.value)
                // Clear input fields after successful sign-in
                emails.value = '';
                password.value = '';
            })
            .catch((error) => {
                console.error("Error:", error.message); // Log specific error message
                // Clear input fields after error
                emails.value = '';
                password.value = '';
            });
    });
});


