const API_URL = "https://me-api-playground-xhyl.onrender.com";

// Load Profile
async function loadProfile() {
  const profileDiv = document.getElementById("profileDisplay");
  profileDiv.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const response = await fetch(`${API_URL}/profile`);
    const data = await response.json();

    if (response.ok) {
      displayProfile(data);
      displayProjects(data.projects);
    } else {
      profileDiv.innerHTML = `<p class="error">${data.message || "Profile not found"}</p>`;
    }
  } catch (error) {
    profileDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Display Profile
function displayProfile(profile) {
  const profileDiv = document.getElementById("profileDisplay");

  profileDiv.innerHTML = `
        <div class="profile-card">
            <h3>${profile.name}</h3>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Title:</strong> ${profile.title}</p>
            <p><strong>Education:</strong> ${profile.education}</p>
            <p><strong>About:</strong> ${profile.description}</p>
            
            <div class="skills-list">
                ${profile.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            
            <div class="links">
                <strong>Links:</strong>
                <a href="${profile.links.github}" target="_blank">GitHub</a>
                <a href="${profile.links.linkedin}" target="_blank">LinkedIn</a>
                <a href="${profile.links.portfolio}" target="_blank">Portfolio</a>
            </div>
        </div>
    `;
}

// Display Projects
function displayProjects(projects) {
  const projectsDiv = document.getElementById("projectsList");

  if (!projects || projects.length === 0) {
    projectsDiv.innerHTML = "<p>No projects found</p>";
    return;
  }

  projectsDiv.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project →</a>
        </div>
    `,
    )
    .join("");
}

// Search Skills
async function searchSkills() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const query = searchInput.value.trim();

  searchResults.innerHTML = '<p class="loading">Searching...</p>';

  try {
    const response = await fetch(`${API_URL}/skills/search?q=${query}`);
    const skills = await response.json();

    if (response.ok) {
      if (skills.length === 0) {
        searchResults.innerHTML = "<p>No skills found</p>";
      } else {
        searchResults.innerHTML = `
                    <div class="skills-list">
                        ${skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                    </div>
                `;
      }
    } else {
      searchResults.innerHTML = `<p class="error">Error searching skills</p>`;
    }
  } catch (error) {
    searchResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Load profile on page load
window.onload = loadProfile;
