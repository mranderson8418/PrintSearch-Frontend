
//this is an array of posts
const posts = [
	{ title: "Post One", body: "This is post one" },
	{ title: "Post Two", body: "This is post two" },
];


//getPosts will get the posts array and create list elements in our html file
function getPosts() {

	setTimeout(() => {
		let output = "";
		posts.forEach((post, index) => {
			output += `<li>${post.title}<li>`;
		});
		document.body.innerHTML = output;
	}, 1000);
}


//the reason it waited 2 seconds -is because it had to wait to create the post before it had to call the callback
function createPost(post, callback) {

	setTimeout(() => {
		posts.push(post);
		callback();
	}, 2000);
}



createPost({ title: "Post Three", body: "This is post three" }, getPosts);


