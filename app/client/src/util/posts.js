function appendPost(post) {
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

  const numOfLikes = document.createElement("p");
  numOfLikes.id = "numOfLikes";
  numOfLikes.innerText = "0";
  numOfLikes.style.display = "inline";

  likeButton.addEventListener("click", () => {
    handleLike(likeButton, numOfLikes);
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
  fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        appendPost(post);
      });
    });
}

function handleLike(likeButton, numOfLikes) {
  const color = likeButton.style.color;
  likeButton.style.color = color === "red" ? "#2d3842" : "red";

  numOfLikes.innerText = parseInt(numOfLikes.innerText) + 1;
}

module.exports = {
  appendPost: appendPost,
  listAllPosts: listAllPosts
};
