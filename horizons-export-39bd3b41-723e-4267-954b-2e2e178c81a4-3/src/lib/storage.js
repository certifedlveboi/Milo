
// Local storage keys
const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings',
  NOTES: 'notes',
  REMINDERS: 'reminders'
};

export const getCurrentUser = () => {
  const settings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
  return settings ? JSON.parse(settings) : null;
};

export const saveUserSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  return settings;
};

export const getNotes = () => {
  const notes = localStorage.getItem(STORAGE_KEYS.NOTES);
  return notes ? JSON.parse(notes) : {};
};

export const addNote = (noteData) => {
  const notes = getNotes();
  const dateStr = noteData.timestamp.split('T')[0];
  if (!notes[dateStr]) {
    notes[dateStr] = [];
  }
  const newNote = { ...noteData, id: Date.now() };
  notes[dateStr].push(newNote);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return newNote;
};

export const updateNote = (noteId, updates) => {
  const notes = getNotes();
  let updatedNote = null;
  
  Object.keys(notes).forEach(dateStr => {
    const noteIndex = notes[dateStr].findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      notes[dateStr][noteIndex] = { ...notes[dateStr][noteIndex], ...updates };
      updatedNote = notes[dateStr][noteIndex];
    }
  });

  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return updatedNote;
};

export const getReminders = () => {
  const reminders = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return reminders ? JSON.parse(reminders) : {};
};

export const addReminder = (reminderData) => {
  const reminders = getReminders();
  const dateStr = reminderData.date;
  if (!reminders[dateStr]) {
    reminders[dateStr] = [];
  }
  const newReminder = { ...reminderData, id: Date.now() };
  reminders[dateStr].push(newReminder);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  return newReminder;
};

export const updateReminder = (reminderId, updates) => {
  const reminders = getReminders();
  let updatedReminder = null;

  Object.keys(reminders).forEach(dateStr => {
    const reminderIndex = reminders[dateStr].findIndex(reminder => reminder.id === reminderId);
    if (reminderIndex !== -1) {
      reminders[dateStr][reminderIndex] = { ...reminders[dateStr][reminderIndex], ...updates };
      updatedReminder = reminders[dateStr][reminderIndex];
    }
  });

  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  return updatedReminder;
};
