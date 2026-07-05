let credits = 10;
let ton = 0;

let posts = [
  {title:"Welcome to ViralTON 🔥", desc:"Start posting and earning", category:"Crypto", likes:12}
];

function updateUI(){
  document.getElementById("credits").innerText = credits;
  document.getElementById("ton").innerText = ton.toFixed(2);
  renderFeed();
}

function renderFeed(){
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((p,i)=>{
    feed.innerHTML += `
      <div class="post">
        <h4>${p.title}</h4>
        <div class="tag">${p.category}</div>
        <p>${p.desc}</p>

        <button onclick="likePost(${i})">❤️ Like (${p.likes})</button>
      </div>
    `;
  });
}

function likePost(i){
  posts[i].likes++;

  ton += 0.01; // reward simulation
  updateUI();
}

function openCreate(){
  document.getElementById("createModal").classList.remove("hidden");
}

function closeCreate(){
  document.getElementById("createModal").classList.add("hidden");
}

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

  document.getElementById("msg").innerText = "✅ Posted successfully!";
  closeCreate();
  updateUI();
}

/* NAV (placeholders for next backend pages) */
function showFeed(){}
function showTasks(){}
function showStore(){}
function showProfile(){}

updateUI();
