// Attach event listener to form submission
document.getElementById("loginForm").addEventListener("submit", loginUser);

// var token = "";
// Function to handle login
async function loginUser(event) {
	event.preventDefault(); // Prevent default form submission
	console.log("submit button clicked");
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		const response = await fetch("http://localhost:8080/api/authenticate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error("Invalid credentials");
		}

		const token = await response.text(); // Parse JSON response

		// Store token in localStorage
		localStorage.setItem("token", token);

		console.log("token = " + token);

		// Redirect to landing page
		alert("Login Successful! Redirecting...");

		window.location.href = "admin-home.html";
	} catch (error) {
		console.error("Error:", error);
		document.getElementById("results").innerText = "Login failed: " + error.message;
	}
}

//Example of how to set a token into local storage.
//localStorage.setItem('your_bearer_token_key', 'your_actual_token_here');

//Example of how to set a token into session storage.
//sessionStorage.setItem('your_bearer_token_key', 'your_actual_token_here');

//Example of how to set a cookie.
// function setCookie(name, value, days) {
// 	let expires = "";
// 	if (days) {
// 		const date = new Date();
// 		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
// 		expires = "; expires=" + date.toUTCString();
// 	}
// 	document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// setCookie("token", token, 7);
