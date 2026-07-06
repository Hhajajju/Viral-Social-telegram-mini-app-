let credits = 10;
let ton = 0;

let posts = [
  {title:"Welcome to Viral Earn 🔥", desc:"Earn TON from likes", likes:3, category:"Crypto"}
];

function updateUI(){
  document.getElementById("credits").innerText = credits;
  document.getElementById("ton").innerText = ton.toFixed(2);
  renderFeed();
}

function showTab(tab){

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");

}

/* FEED */
function renderFeed(){
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((p,i)=>{
    feed.innerHTML += `
      <div class="post">
        <b>${p.title}</b>
        <p>${p.desc}</p>
        <small>${p.category}</small>

        <button onclick="likePost(${i})">❤️ Like (${p.likes})</button>
      </div>
    `;
  });
}

/* LIKE SYSTEM */
function likePost(i){
  posts[i].likes++;

  ton += 0.01; // reward simulation
  updateUI();
}

/* POST SYSTEM */
function publishPost(){

  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const category = document.getElementById("category").value;

  if(credits < 1){
    document.getElementById("msg").innerText = "❌ Insufficient credits";
    return;
  }

  credits -= 1;

  posts.unshift({
    title,
    desc,
    category,
    likes: 0
  });

  document.getElementById("msg").innerText = "✅ Posted successfully";
  updateUI();
}

/* ADS TASK */
function watchAd(){
  credits += 0.1;
  alert("+0.1 credit added");
  updateUI();
}

updateUI();
renderFeed();
