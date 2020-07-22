function appendPost(post, color, likes) {
  const div = document.createElement("div");
  div.className = "post";

  const h4 = document.createElement("h4");
  h4.innerText = post.name;

  const p = document.createElement("p");
  p.innerText = post.date;

  const textArea = document.createElement("textarea");
  textArea.id = "content";
  textArea.readOnly = true;
  textArea.innerText = post.content;

  const span = document.createElement("span");
  span.className = "like-container";

  const likeButton = document.createElement("button");
  likeButton.innerHTML = "&#x2661;"; //heart symbol
  likeButton.id = "like-button";
  likeButton.style.color = color;

  const numOfLikes = document.createElement("p");
  numOfLikes.id = "numOfLikes";
  if (likes === undefined) likes = 0;
  numOfLikes.innerText = likes;
  numOfLikes.style.display = "inline";

  likeButton.addEventListener("click", () => {
    handleLike(likeButton, numOfLikes, post);
  });

  span.style.display = "inline";
  span.appendChild(likeButton);
  span.appendChild(numOfLikes);

  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(textArea);
  div.appendChild(span);

  document.querySelector(".posts").prepend(div);
}

function listAllPosts() {
  //get req.user.username
  fetch("/api/posts/login")
    .then((response) => response.json())
    .then((username) => {
      document.getElementById("username").innerHTML = username;
      //get all posts
      fetch("/api/posts")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((post) => {
            const color = post.likedBy.includes(username)
              ? "#dbbcb9"
              : "#2d3842";
            const likes = post.likes;
            appendPost(post, color, likes);
          });
        });
    });
}

function handleLike(likeButton, numOfLikes, post) {
  let liked = likeButton.style.color === "#dbbcb9" ? false : true;

  if (liked) {
    likeButton.style.color = "#dbbcb9";
    numOfLikes.innerText = parseInt(numOfLikes.innerText) + 1;
  } else {
    likeButton.style.color = "#2d3842";
    numOfLikes.innerText = parseInt(numOfLikes.innerText) - 1;
    liked = false;
  }

  let postUpdate = {};

  //get req.user.username
  fetch("/api/posts/login")
    .then((response) => response.json())
    .then((username) => {
      postUpdate = {
        post: post,
        username: username,
        liked: liked,
      };
    })

    //send post that was just liked/unliked and process in server
    .then((response) => {
      fetch("/api/posts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postUpdate),
      });
    });
}

module.exports = {
  appendPost: appendPost,
  listAllPosts: listAllPosts,
};
