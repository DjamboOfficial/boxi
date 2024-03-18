import React, { useState } from "react";

export const NameInput = ({ onNameChange, onSave }) => {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    onNameChange(newName);
  };
  return (
    <>
      <div className="name-input">
        <label htmlFor="artisan-name">
          <input
            type="text"
            id="artisan-name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        {name && <button onClick={onSave}>Save Name</button>}
      </div>
    </>
  );
};
