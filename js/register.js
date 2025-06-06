const formE1 = document.querySelector(".form-registration");

formE1.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(formE1);

	const data = Object.fromEntries(formData);

	console.log(data);

	let htmlOutput = `
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Password:</strong> ${data.password}</p>
<p><strong>Role:</strong> ${data.role}</p>`;

	document.getElementById("results").innerHTML = htmlOutput;

	setTimeout(submitUserRegistration, 3000);
});

async function submitUserRegistration() {
	if (validateForm()) {
		console.log("--- submit button clicked to register new user ---");

		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let role = document.getElementById("role").value;

		let userObject = {
			username: email, // Removed template literals here
			password: password, // Removed template literals here
			role: role, // Removed template literals here
		};

		try {
			const loginPage = "https://printsearch-frontend-production.up.railway.app/";
			const apiBaseUrl = "https://printdrawingsearchapi-production.up.railway.app";
			const response = await fetch(`${apiBaseUrl}/api/register/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObject), // Removed the extra { userObject } wrapping
			});

			if (!response.ok) {
				console.log("Request to server has failed");
				throw new Error("Invalid credentials for registration request");
			}

			const token = await response.text();

			localStorage.setItem("token", token);

			console.log("token = " + token);

			alert("Registration Successful! Redirecting...");

			window.location.href = `${loginPage}`;
		} catch (error) {
			console.error("Error:", error);
			document.getElementById("results").innerText = "Registration failed I am sorry: " + error.message;
		}
	}
}

validateForm();

document.addEventListener("click", validateForm);

document.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		validateForm();
	}
});

function validateForm() {
	let emailField = document.getElementById("email").value;
	let passwordField = document.getElementById("password").value;
	let passwordTestField = document.getElementById("passwordTest").value;
	let roleField = document.getElementById("role").value;

	// Reset background colors
	document.getElementById("email").style.backgroundColor = "#FFFFFF";
	document.getElementById("password").style.backgroundColor = "#FFFFFF";
	document.getElementById("passwordTest").style.backgroundColor = "#FFFFFF";

	if (emailField === "" || passwordField === "" || passwordTestField === "") {
		// alert("Please fill in all required fields.");

		if (emailField === "") {
			document.getElementById("email").style.backgroundColor = "#f69291";
		}

		if (passwordField === "") {
			document.getElementById("password").style.backgroundColor = "#f69291";
		}

		if (passwordTestField === "") {
			document.getElementById("passwordTest").style.backgroundColor = "#f69291";
		}
		return false;
	}

	if (passwordField !== passwordTestField) {
		// alert("Passwords do not match");

		document.getElementById("password").style.backgroundColor = "#f69291";
		document.getElementById("passwordTest").style.backgroundColor = "#f69291";
		return false;
	}

	return true;
}
