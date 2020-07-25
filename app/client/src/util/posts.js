function appendPost(post, color, likes, img) {
  const div = document.createElement("div");
  div.className = "post";

  const profile_pic = document.createElement("img");
  profile_pic.id = "post_profile_pic";
  profile_pic.src = img;
  profile_pic.alt = "";
  profile_pic.style.width = "50px";
  profile_pic.style.height = "50px";
  profile_pic.style.borderRadius = "25px";

  const name = document.createElement("h4");
  name.innerText = post.name;

  const pic_name_container = document.createElement("span");
  pic_name_container.style.display = "inline";
  pic_name_container.appendChild(profile_pic);
  pic_name_container.appendChild(name);
  profile_pic.style.cssFloat = "left";

  const date = document.createElement("p");
  date.innerText = post.date;

  const content = document.createElement("textarea");
  content.id = "content";
  content.readOnly = true;
  content.innerText = post.content;

  const like_container = document.createElement("span");

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

  like_container.style.display = "inline";
  like_container.appendChild(likeButton);
  like_container.appendChild(numOfLikes);

  div.appendChild(pic_name_container);
  div.appendChild(date);
  div.appendChild(content);
  div.appendChild(like_container);

  document.querySelector(".posts").prepend(div);
}

function listAllPosts() {
  //get req.user.username and profile pic for whoever is logged in
  fetch("/api/posts/login")
    .then((response) => response.json())
    .then((user) => {
      if (user.imageURL) {
        document.getElementById("profile_pic").src = user.imageURL;
        document.getElementById("pic_to_change").src = user.imageURL;
      }
      document.getElementById("username").innerHTML = user.username;

      //get all posts
      fetch("/api/posts")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((post) => {
            const color = post.likedBy.includes(user.username)
              ? "pink"
              : "#2d3842";
            const likes = post.likes;
            appendPost(post, color, likes, post.profile_pic);
          });
        });
    });
}

function handleLike(likeButton, numOfLikes, post) {
  let liked = likeButton.style.color === "pink" ? false : true;

  if (liked) {
    likeButton.style.color = "pink";
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
    .then((user) => {
      postUpdate = {
        post: post,
        username: user.username,
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
