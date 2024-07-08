// Array to hold expenses
let expenses = [];
let editingExpenseId = null;

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
        id: Date.now(), // Unique ID for each expense (using timestamp)
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
    expenses.forEach(function(expense) {
        let li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)}`;
        
        // Add edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editExpense(expense.id);
        };
        li.appendChild(editButton);

        expensesList.appendChild(li);
    });
}

// Function to edit an expense
function editExpense(id) {
    // Find the expense by id
    let expenseToEdit = expenses.find(function(expense) {
        return expense.id === id;
    });

    if (!expenseToEdit) {
        alert('Expense not found.');
        return;
    }

    // Populate edit form with expense details
    document.getElementById('editExpenseDesc').value = expenseToEdit.description;
    document.getElementById('editExpenseAmount').value = expenseToEdit.amount;

    // Show edit form and hide add expense button temporarily
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('expenseDesc').disabled = true;
    document.getElementById('expenseAmount').disabled = true;

    // Set the current editing expense id
    editingExpenseId = id;
}

// Function to update an expense
function updateExpense() {
    // Get updated values from edit form
    let updatedDescription = document.getElementById('editExpenseDesc').value;
    let updatedAmount = parseFloat(document.getElementById('editExpenseAmount').value);

    // Validate input
    if (updatedDescription.trim() === '' || isNaN(updatedAmount) || updatedAmount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    // Find the expense in the array and update it
    let expenseToUpdate = expenses.find(function(expense) {
        return expense.id === editingExpenseId;
    });

    if (!expenseToUpdate) {
        alert('Expense not found.');
        return;
    }

    // Update expense details
    expenseToUpdate.description = updatedDescription;
    expenseToUpdate.amount = updatedAmount;

    // Clear edit form and hide it
    document.getElementById('editExpenseDesc').value = '';
    document.getElementById('editExpenseAmount').value = '';
    document.getElementById('editForm').style.display = 'none';

    // Enable add expense fields
    document.getElementById('expenseDesc').disabled = false;
    document.getElementById('expenseAmount').disabled = false;

    // Clear editing expense id
    editingExpenseId = null;

    // Refresh the expenses list
    displayExpenses();
}

// Function to cancel editing an expense
function cancelEdit() {
    // Clear edit form and hide it
    document.getElementById('editExpenseDesc').value = '';
    document.getElementById('editExpenseAmount').value = '';
    document.getElementById('editForm').style.display = 'none';

    // Enable add expense fields
    document.getElementById('expenseDesc').disabled = false;
    document.getElementById('expenseAmount').disabled = false;

    // Clear editing expense id
    editingExpenseId = null;
}
