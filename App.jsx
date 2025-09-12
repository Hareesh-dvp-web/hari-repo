import './App.css';


// Leaderboard.jsx with User Input Form (uses external CSS)

import React, {  useState } from "react";
import  "./leaderboard.css";



const Leaderboard = () => {
  const [data, setData] = useState([
    { id: "T101", name: "Ravi", likes: 12, liked: false },
    { id: "T102", name: "Sita", likes: 18, liked: false },
    { id: "T103", name: "Arjun", likes: 9, liked: false },
  ]);

  const [newTraveller, setNewTraveller] = useState({ name: "" });
  const [sortOrder, setSortOrder] = useState("desc");

  // handle input change
  const handleChange = (e) => {
    setNewTraveller({ ...newTraveller, [e.target.name]: e.target.value });
  };

  // add traveller (likes start at 0)
  const addTraveller = (e) => {
    e.preventDefault();
    if (!newTraveller.name) return;

    const newEntry = {
      id: "T" + (data.length + 101),
      name: newTraveller.name,
      likes: 0,
      liked: false,
    };

    setData([...data, newEntry]);
    setNewTraveller({ name: "" });
  };

  // toggle like
  const toggleLike = (id) => {
    const updatedData = data.map((traveller) => {
      if (traveller.id === id) {
        const isLiked = !traveller.liked;
        return {
          ...traveller,
          liked: isLiked,
          likes: isLiked ? traveller.likes + 1 : traveller.likes - 1,
        };
      }
      return traveller;
    });
    setData(updatedData);
  };

  // sort travellers by likes
  const sortedData = [...data].sort((a, b) =>
    sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes
  );

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Traveller Leaderboard</h2>
        <p className="leaderboard-subtitle">Ranking based on Likes ❤️</p>

        {/* Form */}
        <form className="leaderboard-form" onSubmit={addTraveller}>
          <input
            type="text"
            name="name"
            placeholder="Traveller Name"
            value={newTraveller.name}
            onChange={handleChange}
            className="leaderboard-input"
          />
          <button type="submit" className="leaderboard-add-btn">
            Add
          </button>
        </form>

        {/* Controls */}
        <div className="leaderboard-controls">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="leaderboard-select"
          >
            <option value="desc">Most Likes First</option>
            <option value="asc">Least Likes First</option>
          </select>
        </div>

        {/* List */}
        <ul className="leaderboard-list">
          {sortedData.map((traveller, index) => (
            <li
              key={traveller.id}
              className={`leaderboard-item ${
                index === 0 ? "leaderboard-current" : ""
              }`}
            >
              <div className="leaderboard-left">
                <span className="leaderboard-rank">{index + 1}</span>
                <div>
                  <div className="leaderboard-name">
                    {traveller.name}{" "}
                    <span
                      className={`like-button ${traveller.liked ? "liked" : ""}`}
                      onClick={() => toggleLike(traveller.id)}
                      style={{ cursor: "pointer" }}
                    >
                      ❤️
                    </span>
                  </div>
                  <div className="leaderboard-id">{traveller.id}</div>
                </div>
              </div>
              <div className="leaderboard-right">
                <div className="leaderboard-score">{traveller.likes}</div>
                <div className="leaderboard-points">likes</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;

