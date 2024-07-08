// Array to hold expenses
let expenses = [];

// Function to add an expense
function addExpense() {
    // Get input values
    let description = document.getElementById('expenseDesc').value;
    let amount = parseFloat(document.getElementById('expenseAmount').value);

    // Validate input
    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    // Create expense object
    let expense = {
        description: description,
        amount: amount
    };

    // Add expense to array
    expenses.push(expense);

    // Clear input fields
    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseAmount').value = '';

    // Refresh the expenses list
    displayExpenses();
}

// Function to display expenses
function displayExpenses() {
    let expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = ''; // Clear existing list

    // Add each expense to the list
    expenses.forEach(function(expense, index) {
        let li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)}`;
        expensesList.appendChild(li);
    });
}
