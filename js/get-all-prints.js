let currentPage = 0;
let pageSize = 0; // Adjust as needed
let totalPages = 0; // Will be determined by the data

let drawingName = "";
let diameterMinValue = 0;
let diameterMaxValue = 0;
let faceLengthMinValue = 0;
let faceLengthMaxValue = 0;

// Attach event listener to form submission
// document.getElementById("filter-fields").addEventListener("submit", getFormFields);
function getDrawingName() {
	drawingName = "";
	drawingName = document.getElementById("drawingName").value;

	return drawingName;
}

function getPageSize() {
	pageSize = document.getElementById("pageSize").value;

	if (pageSize != null && pageSize != 0) {
		return pageSize;
	} else {
		pageSize = 50;
		console.log("pageSize = " + pageSize);
		return pageSize;
	}
}
function getDiameterMinValue() {
	diameterMinValue = document.getElementById("diameterMinValue").value;
	return diameterMinValue;
}

function getDiameterMaxValue() {
	diameterMaxValue = document.getElementById("diameterMaxValue").value;
	return diameterMaxValue;
}
function getFaceLengthMinValue() {
	faceLengthMinValue = document.getElementById("faceLengthMinValue").value;
	return faceLengthMinValue;
}
function getFaceLengthMaxValue() {
	faceLengthMaxValue = document.getElementById("faceLengthMaxValue").value;

	return faceLengthMaxValue;
}

// Event listeners for pagination controls
document.getElementById("prevPage").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		getAllPrints(currentPage);
	}
});

document.getElementById("nextPage").addEventListener("click", () => {
	if (currentPage < totalPages) {
		currentPage++;
		console.log("Clicked Next Page");
		console.log("currentPage = " + currentPage);
		getAllPrints(currentPage);
	}
});

document.getElementById("get-all-prints").addEventListener("click", getAllPrints);

//GET ALL PRINTS
async function getAllPrints() {
	if (validateForm()) {
		console.log("currentpage ==== " + currentPage);
		pageSize = getPageSize();
		console.log("pageSize = " + pageSize);
		drawingName = getDrawingName();
		diameterMinValue = getDiameterMinValue();
		diameterMaxValue = getDiameterMaxValue();
		faceLengthMinValue = getFaceLengthMinValue();
		faceLengthMaxValue = getFaceLengthMaxValue();

		console.log(pageSize);
		console.log(drawingName);
		console.log(diameterMinValue);
		console.log(diameterMaxValue);
		console.log(faceLengthMinValue);
		console.log(faceLengthMaxValue);

		document.getElementById("results").innerHTML = "";

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
			const apiBaseUrl = process.env.API_BASE_URL;
			const response = await fetch(
				`${apiBaseUrl}/api/pagination/${currentPage}/${pageSize}?sortField=diameterMinValue&drawingName=${drawingName}&diameterMinValue=${diameterMinValue}&diameterMaxValue=${diameterMaxValue}&faceLengthMinValue=${faceLengthMinValue}&faceLengthMaxValue=${faceLengthMaxValue}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${storedToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				alert("failed to fetch prints");
				throw new Error("Failed to fetch prints");
			}

			const data = await response.json(); // Fixed JSON parsing

			// Store the token in localStorage if needed
			// localStorage.setItem("token", data.token);

			// Display success message
			console.log(data);

			totalPages = data.totalPages;

			// populateTable(data);
			console.log("currentPage = " + currentPage);
			console.log("total-pages = " + totalPages);
			const contentArray = data.content;
			// let htmlOutput = createPrintDrawingHtml();
			// console.log("contentArray[0] =======> " + contentArray[0]);

			const arrayOfObjects = [];

			for (let i = 0; i < contentArray.length; i++) {
				let htmlOutputTemp = createPrintDrawingHtml(contentArray[i]);

				document.getElementById("results").innerHTML += htmlOutputTemp;

				htmlOutputTemp == 0;
			}

			// alert("Fetched print data successfully!")

			// window.location.href = "get-all-prints.html";
			document.getElementById("current-page").innerHTML = currentPage;
			document.getElementById("total-pages").innerHTML = totalPages;
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to fetch prints: " + error.message);
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	console.log("DOMContentLoaded() Method Start.......");
	// Assuming the bearer token is stored in localStorage, sessionStorage, or a cookie.
	// Replace 'your_bearer_token_key' with the actual key.

	let bearerToken = localStorage.getItem("authToken"); // Example using localStorage

	// console.log("bearerToken ======= " + bearerToken);
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

				<td> ${contentArray.id}</td>
<td>${contentArray.drawingName}</td>
<td> ${contentArray.customer}</td>
<td> ${contentArray.oem}</td>
<td>${contentArray.diameterMinValue}</td>
<td> ${contentArray.faceLengthMinValue}</td>
<td> ${contentArray.bearingMin}</td>
<td> ${contentArray.bearingMax}</td>
<td>${contentArray.customerPin}</td>
<td> ${contentArray.customerRevision}</td>
<td> ${contentArray.date}</td>
<td> ${contentArray.dateCreated}</td>
<td> ${contentArray.originatingCustomer}</td>
<td>${contentArray.partNo}</td>
<td>${contentArray.prevPartNo}</td>
<td>${contentArray.productCode}</td>
<td> ${contentArray.revNumber}</td>
<td> ${contentArray.steps}</td>
<td> ${contentArray.subcontractor}</td>
   <td> ${contentArray.type}</td>
	  <td> ${contentArray.dmgDrawingPath}</td>
<td> ${contentArray.scannedPath}</td>
	  <td> ${contentArray.pdfPath}</td>


`;

	return htmlOutput;
}

validateForm();

document.addEventListener("click", validateForm);

document.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		validateForm();
	}
});

function validateForm() {
	let diameterMinValue = document.getElementById("diameterMinValue").value;
	let diameterMaxValue = document.getElementById("diameterMaxValue").value;
	let faceLengthMinValue = document.getElementById("faceLengthMinValue").value;
	let faceLengthMaxValue = document.getElementById("faceLengthMaxValue").value;

	// Reset background colors
	document.getElementById("diameterMinValue").style.backgroundColor = "#FFFFFF";
	document.getElementById("diameterMaxValue").style.backgroundColor = "#FFFFFF";
	document.getElementById("faceLengthMinValue").style.backgroundColor = "#FFFFFF";
	document.getElementById("faceLengthMaxValue").style.backgroundColor = "#FFFFFF";

	if (diameterMinValue === "" || diameterMaxValue === "" || faceLengthMinValue === "" || faceLengthMaxValue === "") {
		// alert("Please fill in all required fields.");

		if (diameterMinValue === "") {
			document.getElementById("diameterMinValue").style.backgroundColor = "#f69291";
		}

		if (diameterMaxValue === "") {
			document.getElementById("diameterMaxValue").style.backgroundColor = "#f69291";
		}

		if (faceLengthMinValue === "") {
			document.getElementById("faceLengthMinValue").style.backgroundColor = "#f69291";
		}

		if (faceLengthMaxValue === "") {
			document.getElementById("faceLengthMaxValue").style.backgroundColor = "#f69291";
		}
		return false;
	}

	return true;
}
