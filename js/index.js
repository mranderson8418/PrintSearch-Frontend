document.getElementById("get-all-prints").addEventListener("click", redirectToPage);
function redirectToPage() {
	window.location.href = "get-all-prints.html";
}

document.getElementById("login-page").addEventListener("click", redirectToLoginPage);
function redirectToLoginPage() {
	window.location.href = "index.html";
}

//GET ALL PRINTS
async function getAllPrints() {
	console.log("getAllPrints() Method Start.......");
	var secretKey = localStorage.getItem("authToken"); // Replace with your actual secret key

	console.log("secret key = " + secretKey);

	console.log("Enter Get All Prints");
	const storedToken = localStorage.getItem("authToken");

	if (!storedToken) {
		alert("No authentication token found. Please log in.");
		return;
	}

	try {
		const apiBaseUrl = "https://printdrawingsearchapi-production.up.railway.app";
		const response = await fetch(`${apiBaseUrl}/api/print?pageNo=0&pageSize=10`, {
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
		localStorage.setItem("token", data.token);

		// Display success message
		// console.log(data);

		const contentArray = data.content;
		// let htmlOutput = createPrintDrawingHtml();
		console.log("contentArray[0]======= " + contentArray[0]);

		const arrayOfObjects = [];

		for (let i = 0; i < contentArray.length; i++) {
			let htmlOutputTemp = createPrintDrawingHtml(contentArray[i]);

			document.getElementById("results").innerHTML += htmlOutputTemp + "/n";

			console.log("OutputHtml data ====>");

			htmlOutputTemp == 0;
		}

		alert("Fetched print data successfully!");

		// window.location.href = "get-all-prints.html";
	} catch (error) {
		console.error("Error:", error);
		alert("Failed to fetch prints: " + error.message);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	console.log("DOMContentLoaded() Method Start.......");
	// Assuming the bearer token is stored in localStorage, sessionStorage, or a cookie.
	// Replace 'your_bearer_token_key' with the actual key.

	let bearerToken = localStorage.getItem("authToken"); // Example using localStorage

	console.log("bearerToken ======= " + bearerToken);
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

function createPrintDrawingHtml(contentArray) {
	console.log("createPrintDrawingHtml() Method Start.......");
	let htmlOutput = `
<p><strong>Bearing Max:</strong> ${contentArray.bearingMax}</p>
<p><strong>Bearing Min:</strong> ${contentArray.bearingMin}</p>
<p><strong>Customer:</strong> ${contentArray.customer}</p>
<p><strong>Customer Pin:</strong> ${contentArray.customerPin}</p>
<p><strong>Customer Revision:</strong> ${contentArray.customerRevision}</p>
<p><strong>Date:</strong> ${contentArray.date}</p>
<p><strong>Date Created:</strong> ${contentArray.dateCreated}</p>
<p><strong>Diameter High:</strong> ${contentArray.diameterHigh}</p>
<p><strong>Diameter Low:</strong> ${contentArray.diameterLow}</p>
<p><strong>DMG Drawing Path:</strong> ${contentArray.dmgDrawingPath}</p>
<p><strong>Drawing Name:</strong> ${contentArray.drawingName}</p>
<p><strong>Face Length High:</strong> ${contentArray.faceLengthHigh}</p>
<p><strong>Face Length Low:</strong> ${contentArray.faceLengthLow}</p>
<p><strong>ID:</strong> ${contentArray.id}</p>
<p><strong>New Base Price:</strong> ${contentArray.newBasePrice}</p>
<p><strong>OEM:</strong> ${contentArray.oem}</p>
<p><strong>Originating Customer:</strong> ${contentArray.originatingCustomer}</p>
<p><strong>Part No:</strong> ${contentArray.partNo}</p>
<p><strong>PDF Path:</strong> ${contentArray.pdfPath}</p>
<p><strong>Previous Part No:</strong> ${contentArray.prevPartNo}</p>
<p><strong>Product Code:</strong> ${contentArray.productCode}</p>
<p><strong>Revision Number:</strong> ${contentArray.revNumber}</p>
<p><strong>Scanned Path:</strong> ${contentArray.scannedPath}</p>
<p><strong>Steps:</strong> ${contentArray.steps}</p>
<p><strong>Subcontractor:</strong> ${contentArray.subcontractor}</p>
<p><strong>Type:</strong> ${contentArray.type}</p>
<p><strong>XLSM Path:</strong> ${contentArray.xlsmPath}</p>
<p><strong>XLSX Path:</strong> ${contentArray.xlsxPath}</p>
`;

	return htmlOutput;
}
