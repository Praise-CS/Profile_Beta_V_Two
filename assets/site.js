(() => {
  const THEME_KEY = "theme";

  const skills = [
    { name: "HTML", category: "Technical" },
    { name: "CSS", category: "Technical" },
    { name: "OOP", category: "Technical" },
    { name: "Java", category: "Technical" },
    { name: "Git", category: "Technical" },
    { name: "Linux", category: "Technical" },
    { name: "Agile", category: "Technical" },
    { name: "Strong Communication", category: "Interpersonal" },
    { name: "Collaboration Skills", category: "Interpersonal" },
    { name: "Time Management", category: "Interpersonal" },
    { name: "Problem Solving", category: "Interpersonal" },
    { name: "Self-Management", category: "Interpersonal" },
    { name: "Creativity", category: "Interpersonal" },
    { name: "Bilingual (English & Yoruba)", category: "Interpersonal" },
    { name: "Team Player", category: "Interpersonal" },
  ];

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  function setTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
  }

  function injectHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    header.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-primary text-white px-3">
        <a class="navbar-brand text-white fw-bold" href="./index.html"></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link text-white" href="./index.html" data-nav="home">Home</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="./about.html" data-nav="about">About</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="./projects.html" data-nav="projects">Projects</a></li>
          </ul>

          <button class="btn btn-light ms-3" id="themeToggle" type="button"></button>
        </div>
      </nav>
    `;

    // active link
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const activeKey =
      path.includes("about") ? "about" : path.includes("projects") ? "projects" : "home";

    header.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.getAttribute("data-nav") === activeKey) a.classList.add("fw-bold", "text-decoration-underline");
    });
  }

  function injectFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = `
      <footer class="site-footer">
        <p>&copy; ${year} React Portfolio. All rights reserved.</p>
        <p>
          <span class="footer-text">Privacy Policy.</span>
          <span class="footer-text">Terms of Service</span>
        </p>
      </footer>
    `;
  }

  function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      setTheme(next);
    });
  }

  function initSkillsUI() {
    const grid = document.getElementById("skillGrid");
    const searchInput = document.getElementById("skillSearch");
    const filterButtons = document.querySelectorAll("[data-skill-filter]");

    if (!grid || !searchInput || filterButtons.length === 0) return;

    let activeCategory = "All";
    let search = "";

    function render() {
      const filtered = skills.filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "All" || s.category === activeCategory;
        return matchesSearch && matchesCategory;
      });

      grid.innerHTML = filtered
        .map(
          (s) => `
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="p-3 rounded-4 border bg-body-tertiary h-100 text-dark">
                <h3 class="h5 mb-1">${s.name}</h3>
                <p class="mb-0">${s.category}</p>
              </div>
            </div>
          `
        )
        .join("");
    }

    searchInput.addEventListener("input", (e) => {
      search = e.target.value || "";
      render();
    });

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-skill-filter");

        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        render();
      });
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectHeader();
    injectFooter();

    setTheme(getTheme());
    initThemeToggle();

    initSkillsUI();
  });
})();
