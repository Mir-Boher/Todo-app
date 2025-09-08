const listItems = document.querySelector(".list-items");
const inputField = document.getElementById("task-input");
const clearCompletedBtn = document.querySelector(".clear-completed-list-btn");
const remainingItems = document.querySelector(".remaining-items");
const listInfo = document.querySelector(".list-info");
const listOptions = document.querySelector(".list-options");
const iconContainer = document.querySelector(".icon-container");
const root = document.documentElement;

let listCount = 0;

iconContainer.addEventListener("click", (e) => {
  const darkMode = document.querySelector(".moon-icon");
  const lightMode = document.querySelector(".sun-icon");
  const clickedElement = e.target.closest(".moon-icon, .sun-icon");

  if (clickedElement) {
    if (clickedElement.classList.contains("moon-icon")) {
      darkMode.style.display = "none";
      lightMode.style.display = "block";
      root.style.setProperty("--theme-1-bg", "var(--theme-2-bg)");
      root.style.setProperty("--theme-1-todo-bg", "var(--theme-2-todo-bg)");
      root.style.setProperty("--theme-1-border", "var(--theme-2-border)");
      root.style.setProperty(
        "--theme-1-title-text",
        "var(--theme-2-title-text)"
      );
    } else if (clickedElement.classList.contains("sun-icon")) {
      darkMode.style.display = "block";
      lightMode.style.display = "none";
      root.style.setProperty("--theme-1-bg", "hsl(0, 0%, 98%)");
      root.style.setProperty("--theme-1-todo-bg", "hsl(0, 0%, 98%)");
      root.style.setProperty("--theme-1-border", "hsl(233, 11%, 84%)");
      root.style.setProperty("--theme-1-title-text", "hsl(235, 19%, 35%)");
    }
  }
});

inputField.addEventListener("change", () => {
  listInfo.style.display = "flex";
  const value = inputField.value;
  const element = document.createElement("article");
  element.classList.add("item");
  element.innerHTML = ` <div class="tickbox">
  <svg
    class="tick"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="9"
    style="display: none;"
  >
    <path
      fill="none"
      stroke="white"
      stroke-width="2"
      d="M1 4.304L3.696 7l6-6"
    />
  </svg>
</div>
  <p class="title">${value}</p>
  <svg
    class="cross-btn"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
  >
    <path
      fill="#494C6B"
      fill-rule="evenodd"
      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
    />
  </svg>`;
  listItems.appendChild(element);
  inputField.value = "";
  listCount = listItems.childElementCount;
  remainingItems.textContent = `${listCount} items`;
});

listItems.addEventListener("click", (e) => {
  const tickBox = e.target.closest(".tickbox");
  if (tickBox) {
    const titleElement = tickBox.nextElementSibling;
    if (titleElement.classList.contains("title-remove")) {
      tickBox.classList.remove("tickbox-active");
      titleElement.classList.remove("title-remove");
    } else {
      titleElement.classList.add("title-remove");
      tickBox.classList.add("tickbox-active");
    }
    const tick = tickBox.querySelector(".tick");
    tick.style.display = tick.style.display === "none" ? "block" : "none";
  }

  const crossBtn = e.target.closest(".cross-btn");
  if (crossBtn) {
    const parentElement = crossBtn.closest(".item");
    parentElement.remove();
    listCount--;
    remainingItems.textContent = `${listCount} items`;
    if (listCount === 0) {
      listInfo.style.display = "none";
    }
  }
});

listOptions.addEventListener("click", (event) => {
  const allBtn = document.querySelector(".all-btn");
  const activeBtn = document.querySelector(".active-btn");
  const completeBtn = document.querySelector(".complete-btn");

  allBtn.classList.remove("active-option");
  activeBtn.classList.remove("active-option");
  completeBtn.classList.remove("active-option");

  if (event.target.classList.contains("all-btn")) {
    allBtn.classList.add("active-option");
    showAll();
  } else if (event.target.classList.contains("active-btn")) {
    activeBtn.classList.add("active-option");
    showActive();
  } else if (event.target.classList.contains("complete-btn")) {
    completeBtn.classList.add("active-option");
    showCompleted();
  }
});

clearCompletedBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    if (item.querySelector(".tickbox").classList.contains("tickbox-active")) {
      item.remove();
      --listCount;
      if (listCount === 0) {
        listInfo.style.display = "none";
      }
    }
    remainingItems.textContent = `${listCount} items`;
  });
});

function showAll() {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.style.display = "flex";
  });
  listCount = listItems.childElementCount;
  remainingItems.textContent = `${listCount} items`;
}

function showActive() {
  const items = document.querySelectorAll(".item");
  listCount = 0;
  items.forEach((item) => {
    if (item.querySelector(".tickbox").classList.contains("tickbox-active")) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
      listCount++;
    }
  });
  remainingItems.textContent = `${listCount} items left`;
}

function showCompleted() {
  const items = document.querySelectorAll(".item");
  listCount = 0;
  items.forEach((item) => {
    if (item.querySelector(".tickbox").classList.contains("tickbox-active")) {
      item.style.display = "flex";
      listCount++;
    } else {
      item.style.display = "none";
    }
  });
  remainingItems.textContent = `${listCount} items completed`;
}
