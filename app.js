// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results and show loader
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate results
function calculateResults(e) {
    // UI variables 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly *calculatedPayments)-principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }


    e.preventDefault();
}

// show error
function showError(error){
    // hide loader and results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    errorDiv.className = 'alert alert-danger';

    // create text note and append to div
    errorDiv.appendChild(document.createTextNode(error));
    
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 3000);
}

// clear error function
function clearError(){
    document.querySelector('.alert').remove();
}