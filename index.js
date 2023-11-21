document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const entriesTable = document.getElementById('entriesTable');
  const entriesTableBody = entriesTable.getElementsByTagName('tbody')[0];

  function saveToLocalStorage(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  }

 
  function loadFromLocalStorage() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    for (const entry of entries) {
      addEntryToTable(entry);
    }
  }

  function addEntryToTable(entry) {
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
  }

 
  loadFromLocalStorage();

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

   
    saveToLocalStorage({ name, email, password, dob, terms });
    addEntryToTable({ name, email, password, dob, terms });


    form.reset();
  });
});
