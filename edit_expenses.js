let expenses = [];
let editingExpenseId = null;

function addExpense() {
    let description = document.getElementById('expenseDesc').value;
    let amount = parseFloat(document.getElementById('expenseAmount').value);

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    let expense = {
        id: Date.now(),
        description: description,
        amount: amount
    };

    expenses.push(expense);

    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseAmount').value = '';

    displayExpenses();
}

function displayExpenses() {
    let expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach(function(expense) {
        let li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)}`;
        
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editExpense(expense.id);
        };
        li.appendChild(editButton);

        expensesList.appendChild(li);
    });
}

function editExpense(id) {
    let expenseToEdit = expenses.find(function(expense) {
        return expense.id === id;
    });

    if (!expenseToEdit) {
        alert('Expense not found.');
        return;
    }

    document.getElementById('editExpenseDesc').value = expenseToEdit.description;
    document.getElementById('editExpenseAmount').value = expenseToEdit.amount;

    document.getElementById('editForm').style.display = 'block';
    document.getElementById('expenseDesc').disabled = true;
    document.getElementById('expenseAmount').disabled = true;

    editingExpenseId = id;
}

function updateExpense() {
    let updatedDescription = document.getElementById('editExpenseDesc').value;
    let updatedAmount = parseFloat(document.getElementById('editExpenseAmount').value);

    if (updatedDescription.trim() === '' || isNaN(updatedAmount) || updatedAmount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    let expenseToUpdate = expenses.find(function(expense) {
        return expense.id === editingExpenseId;
    });

    if (!expenseToUpdate) {
        alert('Expense not found.');
        return;
    }

    expenseToUpdate.description = updatedDescription;
    expenseToUpdate.amount = updatedAmount;

    document.getElementById('editExpenseDesc').value = '';
    document.getElementById('editExpenseAmount').value = '';
    document.getElementById('editForm').style.display = 'none';

    document.getElementById('expenseDesc').disabled = false;
    document.getElementById('expenseAmount').disabled = false;

    editingExpenseId = null;

    displayExpenses();
}

function cancelEdit() {
    document.getElementById('editExpenseDesc').value = '';
    document.getElementById('editExpenseAmount').value = '';
    document.getElementById('editForm').style.display = 'none';

    document.getElementById('expenseDesc').disabled = false;
    document.getElementById('expenseAmount').disabled = false;

    editingExpenseId = null;
}
