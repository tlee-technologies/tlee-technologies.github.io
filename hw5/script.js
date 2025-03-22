/* 
  Name: Terrance Lee
   Date: 03-20-2025
  Description: Uses GitHub API to fetch and display repository information based on a username.
*/

"use strict";

const form = document.getElementById("user-form");
const input = document.getElementById("username-input");
const gallery = document.getElementById("repo-gallery");

const DEFAULT_USERNAME = "tlee-technologies"; // <-- Replace this with YOUR GitHub username

// Load default user's repos on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchRepos(DEFAULT_USERNAME);
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = input.value.trim();
  if (username) {
    fetchRepos(username);
  }
});

// Fetch list of repositories
async function fetchRepos(username) {
  const url = `https://api.github.com/users/${username}/repos?sort=created&per_page=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("User not found or API error");
    }

    const repos = await response.json();
    displayRepos(repos, username);
  } catch (error) {
    gallery.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Display each repo in the gallery
function displayRepos(repos, username) {
  gallery.innerHTML = ""; // Clear existing gallery

  repos.forEach(async (repo) => {
    const languages = await fetchLanguages(repo.languages_url);
    const commits = await fetchCommitCount(username, repo.name);

    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
      <p>${repo.description || "No description"}</p>
      <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
      <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
      <p><strong>Commits:</strong> ${commits}</p>
      <p><strong>Languages:</strong> ${languages.join(", ") || "N/A"}</p>
    `;
    gallery.appendChild(card);
  });
}

// Fetch languages for a repo
async function fetchLanguages(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return Object.keys(data);
  } catch {
    return ["Unknown"];
  }
}

// Fetch number of commits (up to 100)
async function fetchCommitCount(username, repoName) {
  const url = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return Array.isArray(data) ? data.length : "N/A";
  } catch {
    return "N/A";
  }
}