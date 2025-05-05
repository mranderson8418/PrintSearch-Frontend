
document.getElementById("get-all-prints").addEventListener("button", getAllPrints);

//GET ALL PRINTS
async function getAllPrints() {
	var secretKey = localStorage.getItem("token"); // Replace with your actual secret key

	console.log("secret key = " + secretKey);

	console.log("Enter Get All Prints");
	const storedToken = localStorage.getItem("token");

	if (!storedToken) {
		alert("No authentication token found. Please log in.");
		return;
	}

	try {
		const response = await fetch("http://localhost:8080/api/print?pageNo=0&pageSize=10", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${storedToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch prints");
		}

		const data = await response.json(); // Fixed JSON parsing

		// Store the token in localStorage if needed
		// localStorage.setItem("token", data.token);

		// Display success message
		console.log(data);

		alert("Fetched print data successfully!");

		// window.location.href = "admin-home.html"; // Optional redirection
	} catch (error) {
		console.error("Error:", error);
		alert("Failed to fetch prints: " + error.message);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	// Assuming the bearer token is stored in localStorage, sessionStorage, or a cookie.
	// Replace 'your_bearer_token_key' with the actual key.

	let bearerToken = localStorage.getItem("token"); // Example using localStorage

	console.log("bearerToken ======= +bearerToken");
	if (bearerToken) {
		console.log("Bearer Token:", bearerToken);
	} else {
		console.log("Bearer Token not found.");
		//Check other storage locations.
		bearerToken = sessionStorage.getItem("token");
		if (bearerToken) {
			console.log("Bearer Token (sessionStorage):", bearerToken);
		} else {
			//check cookies.
			function getCookie(name) {
				let cookieValue = null;
				if (document.cookie && document.cookie !== "") {
					const cookies = document.cookie.split(";");
					for (let i = 0; i < cookies.length; i++) {
						const cookie = cookies[i].trim();
						// Does this cookie string begin with the name we want?
						if (cookie.substring(0, name.length + 1) === name + "=") {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}

			bearerToken = getCookie("token");

			if (bearerToken) {
				console.log("Bearer Token (cookie):", bearerToken);
			} else {
				console.log("Bearer Token not found in sessionStorage or cookie.");
			}
		}
	}
});
