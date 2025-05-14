//Toggle password viewer
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
	const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
	passwordInput.setAttribute("type", type);

	// Optionally toggle the icon
	togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Attach event listener to form submission
document.getElementById("loginForm").addEventListener("submit", loginUser);

// Function to handle login
async function loginUser(event) {
	event.preventDefault(); // Prevent default form submission
	console.log("submit button clicked");

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		const loginPage = "https://printsearch-frontend-production.up.railway.app";
		const apiBaseUrl = "https://printdrawingsearchapi-production.up.railway.app";
		const response = await fetch(`${apiBaseUrl}/api/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		console.log("response =====> " + response);
		console.log(typeof response);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Login Failed: ${errorText || "Invalid credentials"}`);
		} else {
			// If the backend returns a plain String token, use response.text()
			response
				.text()
				.then((token) => {
					console.log("Bearer Token: ", token);

					// Store the bearer token (example using localStorage)
					localStorage.setItem("authToken", token);
					console.log("authToken: ", token);
					// Redirect to landing page after successful login and token retrieval
					alert("Login Successful! Redirecting...");
					window.location.href = `${loginPage}/admin-home.html`;
				})
				.catch((error) => {
					console.error("Error getting text response:", error);
					alert("Login Failed: Could not read server response.");
				});
		}
	} catch (error) {
		console.error("Login error: ", error);
		alert("Login Failed: " + error.message);
	}
}
