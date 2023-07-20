import React, { useState } from "react";
import "./Repository.css";

const RepositoryList = ({ repositories }) => {
  const [sortBy, setSortBy] = useState(null);

  const handleSortByStars = () => {
    if (sortBy === "stars") {
      setSortBy(null);
    } else {
      setSortBy("stars");
    }
  };

  const handleSortByForks = () => {
    if (sortBy === "forks") {
      setSortBy(null);
    } else {
      setSortBy("forks");
    }
  };

  const sortedRepositories =
    sortBy === "stars"
      ? repositories.slice().sort((a, b) => b.stargazers_count - a.stargazers_count)
      : sortBy === "forks"
      ? repositories.slice().sort((a, b) => b.forks_count - a.forks_count)
      : repositories;

  return (
    <div className="repository-list">
      <div className="sort-buttons">
        <button onClick={handleSortByStars} className={`sort-button ${sortBy === "stars" ? "active" : ""}`}>
          Sort by Stars {sortBy === "stars" ? "(Desc)" : ""}
        </button>
        <button onClick={handleSortByForks} className={`sort-button ${sortBy === "forks" ? "active" : ""}`}>
          Sort by Forks {sortBy === "forks" ? "(Desc)" : ""}
        </button>
      </div>
      <ul className="repository-items">
        {sortedRepositories.map((repo) => (
          <li key={repo.id} className="repository-item">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="repository-link">
              {repo.name}
            </a>
       
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
