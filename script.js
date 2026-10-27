// ===== PROJECT DATA (at least 8 objects) =====
const projects = [
  { name: "Leave Early", description: "Weather forecast for the drive to campus", category: "Streamlit" },
  { name: "Cereal Explorer", description: "Filter and chart nutrition data", category: "Streamlit" },
  { name: "Parking notes", description: "Simple list of commute times", category: "Class" },
  { name: "National Parks", description: "Dashboard with tabs and sidebar", category: "Streamlit" },
  { name: "World Cup cards", description: "Practice with columns and props", category: "Class" },
  { name: "Say Something True", description: "First Streamlit layout assignment", category: "Class" },
  { name: "Form practice", description: "Six widgets inside a form", category: "Class" },
  { name: "Session state counter", description: "Keeps count across reruns", category: "Streamlit" }
];

// ===== STATE OBJECT =====
const state = {
  searchText: "",
  category: "All"
};

// ===== GET ELEMENTS =====
const themeButton = document.querySelector("#theme-button");
const searchInput = document.querySelector("#search-input");
const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const categoryButtons = document.querySelector("#category-buttons");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");
const nameInput = document.querySelector("#name");
const messageInput = document.querySelector("#message");

// ===== DARK MODE =====
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "Light mode";
  } else {
    themeButton.textContent = "Dark mode";
  }
});

// ===== BUILD CATEGORY BUTTONS (additional feature) =====
function buildCategoryButtons() {
  const categories = ["All", "Streamlit", "Class"];
  categories.forEach(function (cat) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = cat;
    button.addEventListener("click", function () {
      state.category = cat;
      render();
    });
    categoryButtons.appendChild(button);
  });
}

// ===== RENDER FUNCTION (builds the list) =====
function render() {
  // clear old items
  projectList.innerHTML = "";

  const search = state.searchText.trim().toLowerCase();

  // filter by search text and category
  const filtered = projects.filter(function (project) {
    const matchesSearch = project.name.toLowerCase().includes(search) || project.description.toLowerCase().includes(search);
    const matchesCategory = state.category === "All" || project.category === state.category;
    return matchesSearch && matchesCategory;
  });

  // create one li per project
  filtered.forEach(function (project) {
    const li = document.createElement("li");
    li.textContent = project.name + " — " + project.description;
    projectList.appendChild(li);
  });

  // update the count
  projectCount.textContent = "Showing " + filtered.length + " of " + projects.length;
}

// ===== SEARCH BOX =====
searchInput.addEventListener("input", function () {
  state.searchText = searchInput.value;
  render();
});

// ===== FORM HANDLER =====
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  // check input
  if (name === "" || message.length < 5) {
    formMessage.textContent = "Please enter your name and a message of at least 5 characters.";
    return;
  }

  // show summary and clear fields
  formMessage.textContent = "Form summary — Name: " + name + " | Message: " + message;
  nameInput.value = "";
  messageInput.value = "";
});

// ===== START =====
buildCategoryButtons();
render();