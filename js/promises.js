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
//*** Promises ***
//the reason it waited 2 seconds -is because it had to wait to create the post before it had to call the callback
function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const error = true;

      if (!error) {
        resolve();
      } else {
        reject("Something went wrong");
      }
    }, 2000);
  });
}

// createPost({title:'Post Three', body:'This is post Three'}).then(getPosts).catch(err => console.log(err));

const promise1 = Promise.resolve('hello world');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => 
  setTimeout(resolve, 5000, "Goodbye"));

const promise4 = fetch('http://localhjsonplaceholderost:8080/api/task/1').then(res=> res.json());

//yeah

//promise.all
Promise.all([promise1, promise2, promise3]).then(values => console.log(values));


Promise.all([pomise4]).then(values => console.log(values));