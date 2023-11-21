document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const entriesTableBody = document.querySelector('#entriesTable tbody');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate date of birth (age between 18 and 55)
    if (!validateAge(dob)) {
      alert('Date of birth must be between 18 and 55 years old.');
      return;
    }

    const entry = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: terms
    };

    // Store the entry data
    storeEntry(entry);

    // Display the entries in the table
    displayEntries();
  });
  // ... (previous code)
  
  // ... (rest of the code)
  
  function storeEntry(entry) {
    // Using localStorage to store the entry data
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Check for duplicate entries based on name and email
    const isDuplicate = entries.some(existingEntry => (
      existingEntry.name === entry.name && existingEntry.email === entry.email
    ));

    if (!isDuplicate) {
      entries.push(entry);
      localStorage.setItem('entries', JSON.stringify(entries));
    }
  }

  function displayEntries() {
    // Clear the existing table content
    entriesTableBody.innerHTML = '';

    // Retrieve entries from localStorage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Update the table with entries
    entries.forEach(entry => {
      const row = entriesTableBody.insertRow();
      for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
          const cell = row.insertCell();
          cell.textContent = entry[key];
        }
      }
    });
  }

  function validateAge(dateString) {
    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1; // Adjust age if birthday hasn't occurred yet this year
    }

    return age;
  }
});
