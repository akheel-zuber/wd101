document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const entriesTable = document.getElementById('entriesTable');
  const entriesTableBody = entriesTable.getElementsByTagName('tbody')[0];


  loadEntriesFromStorage();

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

  
    const dobDate = new Date(dob);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dobDate < minDate || dobDate > maxDate) {
      alert('Date of Birth must be between 18 and 55 years old.');
      return;
    }

    const newRow = entriesTableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

 
    cell1.textContent = name;
    cell2.textContent = email;
    cell3.textContent = password;
    cell4.textContent = dob;
    cell5.textContent = terms ? 'Yes' : 'No';


    saveEntryToStorage(name, email, password, dob, terms);

    form.reset();
  });

  function saveEntryToStorage(name, email, password, dob, terms) {

    const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];


    const newEntry = { name, email, password, dob, terms };
    existingEntries.push(newEntry);


    localStorage.setItem('entries', JSON.stringify(existingEntries));


    loadEntriesFromStorage();
  }

  function loadEntriesFromStorage() {

    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    entriesTableBody.innerHTML = '';


    entries.forEach(entry => {
      const newRow = entriesTableBody.insertRow();
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);

      cell1.textContent = entry.name;
      cell2.textContent = entry.email;
      cell3.textContent = entry.password;
      cell4.textContent = entry.dob;
      cell5.textContent = entry.terms ? 'Yes' : 'No';
    });
  }
});

