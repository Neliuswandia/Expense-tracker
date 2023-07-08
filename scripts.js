 //The URL for the expenses API
 const apiUrl = 'https://user-q0na.onrender.com/expenses';

//Function to fetch the expenses from the server using GET method
function fetchExpenses() {
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => console.error('Error fetching expenses:', error));
}

//Function to add an expense to the server using POST method
function addExpense(description, amount) {
  const expense = { description, amount };
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
  .then(response => response.json())
  .catch(error => console.error('Error adding expense:', error));
}

//Function to delete an expense from the server
function deleteExpense(id) {
  const deleteUrl = `${apiUrl}/${id}`;
  return fetch(deleteUrl, {
    method: 'DELETE',
  })
  .catch(error => console.error('Error deleting expense:', error));
}

//Function to display expenses 
function displayExpenses(expenses) {
  const expenseList = document.getElementById('expense_list');
  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${expense.description}</span> - $${expense.amount}
    <button class="delete-btn" data-id="${expense.id}">Delete</button>`//delete button
    expenseList.appendChild(listItem);
  });
}

//function to update expenses
function updateExpenses() {
  fetchExpenses().then(data => {
    displayExpenses(data);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  updateExpenses();

  const budgetForm = document.getElementById('budget_form');
  budgetForm.addEventListener('submit', event => {
    event.preventDefault();
    const description = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;
    if (description && amount) {
      addExpense(description, amount).then(() => {
        updateExpenses();
        document.getElementById('expense').value = '';
        document.getElementById('amount').value = '';
      });
    }
  });

  const expenseList = document.getElementById('expense_list');
  expenseList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
      const expenseId = event.target.dataset.id;
      deleteExpense(expenseId).then(() => {
        updateExpenses();
      });
    }
  });
});
