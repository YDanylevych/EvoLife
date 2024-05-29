import React, { useState, useEffect } from 'react';
import httpClient from '../../additional/httpClient';
import './styles.css';

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const response = await httpClient.get('/diary');
      setEntries(response.data);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleAddEntry = async () => {
    if (currentEntry.trim() && entryDate.trim()) {
      try {
        const response = await httpClient.post('/diary', {
          date: entryDate,
          text: currentEntry,
        });
        setEntries([response.data, ...entries]);
        setCurrentEntry("");
        setEntryDate("");
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    }
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    document.querySelector('.overlay').classList.add('active');
  };

  const handleEditEntry = async () => {
    try {
      await httpClient.put(`/diary/${editingEntry.id}`, {
        text: editedText,
      });
      setEntries(entries.map(entry => {
        if (entry.id === editingEntry.id) {
          return { ...entry, text: editedText };
        }
        return entry;
      }));
      setEditingEntry(null);
      setEditedText("");
      document.querySelector('.overlay').classList.remove('active');
    } catch (error) {
      console.error('Error editing entry:', error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await httpClient.delete(`/diary/${entryId}`);
      setEntries(entries.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setEditingEntry(null);
    document.querySelector('.overlay').classList.remove('active');
  };

  return (
    <div className="page-container">
      <div className="overlay" onClick={closeModal}></div>
      <div className="page-header">
        <h1 className="page-title">Your Diary</h1>
      </div>
      <div className="diary-container">
        <div className="add-entry-section">
          <h2>Write Your Thoughts</h2>
          <input
            type="date"
            className="diary-date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
          <textarea
            className="diary-textarea"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Write your diary entry here..."
          />
          <button className="diary-button" onClick={handleAddEntry}>
            Add Entry
          </button>
        </div>
        <div className="saved-entries-section">
          <h2>Saved Entries</h2>
          <div className="diary-entries">
            {entries.map(entry => (
              <div 
                key={entry.id} 
                className="diary-entry" 
              >
                <div className="entry-header">
                  <p className="diary-entry-date" onClick={() => handleEntryClick(entry)}>
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <div className="entry-buttons">
                    <button className="edit-button" onClick={() => {
                      setEditingEntry(entry);
                      setEditedText(entry.text);
                      document.querySelector('.overlay').classList.add('active');
                    }}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteEntry(entry.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(selectedEntry || editingEntry) && (
        <div className="modal wrapped-window">
          <div className="modal-content wrapped-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="entry-date">{new Date((selectedEntry || editingEntry).date).toLocaleDateString()}</h2>
            <textarea
              className="diary-textarea modal-textarea"
              value={editingEntry ? editedText : (selectedEntry && selectedEntry.text)}
              onChange={(e) => editingEntry && setEditedText(e.target.value)}
              placeholder="Write your diary entry here..."
              readOnly={!editingEntry}
            />
            {editingEntry && (
              <button className="save-button" onClick={handleEditEntry}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
