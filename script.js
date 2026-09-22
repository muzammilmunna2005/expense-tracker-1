// Load saved expenses
let expenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];


// Add expense
function addExpense() {

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;


    // Check amount
    if (amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    // Create expense
    const expense = {

        id: Date.now(),

        amount: amount,

        category: category

    };


    // Add to array
    expenses.push(expense);


    // Save
    saveExpenses();


    // Display
    displayExpenses();


    // Clear amount
    document.getElementById("amount").value = "";
}



// Save expenses
function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}



// Display everything
function displayExpenses() {

    const categoryTable =
        document.getElementById("categoryTable");

    const expenseList =
        document.getElementById("expenseList");


    // Clear old data
    categoryTable.innerHTML = "";

    expenseList.innerHTML = "";


    // Store category totals
    let categoryTotals = {};

    let grandTotal = 0;


    // Calculate totals
    expenses.forEach(function(expense) {

        grandTotal =
            grandTotal + expense.amount;


        if (categoryTotals[expense.category]) {

            categoryTotals[expense.category] =
                categoryTotals[expense.category] +
                expense.amount;

        } else {

            categoryTotals[expense.category] =
                expense.amount;

        }

    });


    // Display category totals
    for (let category in categoryTotals) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${category}</td>
            <td>₹${categoryTotals[category]}</td>
        `;


        categoryTable.appendChild(row);

    }


    // Display grand total in table
    const totalRow =
        document.createElement("tr");


    totalRow.innerHTML = `
        <th>Total</th>
        <th>₹${grandTotal}</th>
    `;


    categoryTable.appendChild(totalRow);


    // Display individual expenses
    expenses.forEach(function(expense) {

        const item =
            document.createElement("div");


        item.className =
            "expense-item";


        item.innerHTML = `

            <span>
                ${expense.category}
                - ₹${expense.amount}
            </span>

            <button
                class="delete-button"
                onclick="deleteExpense(${expense.id})"
            >
                Delete
            </button>

        `;


        expenseList.appendChild(item);

    });


    // Display total
    document.getElementById("total").textContent =
        "₹" + grandTotal;

}



// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(
        function(expense) {

            return expense.id !== id;

        }
    );


    saveExpenses();

    displayExpenses();

}



// Load expenses when website opens
displayExpenses();