document.addEventListener('DOMContentLoaded', () => {
    // --- Constants ---
    const DAILY_AMOUNT = 20;
    const STORAGE_KEY_BALANCE = 'daily_savings_balance';
    const STORAGE_KEY_DATE = 'daily_savings_date';

    // --- DOM Elements ---
    const balanceDisplay = document.getElementById('balanceDisplay');
    const deductForm = document.getElementById('deductForm');
    const deductAmountInput = document.getElementById('deductAmount');
    const resetBtn = document.getElementById('resetBtn');
    const notification = document.getElementById('notification');

    let notificationTimeout;

    // --- Initialization ---
    initTracker();

    // --- Core Functions ---
    function initTracker() {
        let balance = localStorage.getItem(STORAGE_KEY_BALANCE);
        let lastDate = localStorage.getItem(STORAGE_KEY_DATE);
        const today = getLocalYYYYMMDD(new Date());

        // Setup for first-time visitors or corrupted data
        if (balance === null || lastDate === null || isNaN(parseFloat(balance))) {
            balance = 0;
            lastDate = today;
            saveData(balance, lastDate);
        } else {
            balance = parseFloat(balance);
            
            // Calculate elapsed calendar days
            const elapsedDays = getCalendarDaysDifference(lastDate, today);
            
            // Apply daily increments if days have passed
            if (elapsedDays > 0) {
                const addedAmount = elapsedDays * DAILY_AMOUNT;
                balance += addedAmount;
                lastDate = today;
                saveData(balance, lastDate);
            } 
        }

        renderBalance(balance);
    }

    function saveData(balance, dateStr) {
        localStorage.setItem(STORAGE_KEY_BALANCE, balance.toString());
        localStorage.setItem(STORAGE_KEY_DATE, dateStr);
    }

    function renderBalance(amount) {
        // Formats to Indian Numbering System
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
            maximumFractionDigits: 2
        });
        
        balanceDisplay.textContent = formatter.format(amount);
    }

    // --- Event Listeners ---
    deductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputValue = deductAmountInput.value.trim();
        const amountToDeduct = parseFloat(inputValue);

        // Validation - Removed the > 0 check so negatives are allowed
        if (inputValue === '' || isNaN(amountToDeduct) || !isFinite(amountToDeduct)) {
            showNotification('Please enter a valid number.', 'error');
            return;
        }

        // Deduct logic (Subtracting a negative number mathematically adds to the balance)
        let currentBalance = parseFloat(localStorage.getItem(STORAGE_KEY_BALANCE));
        currentBalance -= amountToDeduct;
        
        // Save and update
        const currentDate = localStorage.getItem(STORAGE_KEY_DATE);
        saveData(currentBalance, currentDate);
        renderBalance(currentBalance);
        
        // Reset input and notify
        deductAmountInput.value = '';
        showNotification(`₹${amountToDeduct} deducted successfully.`, 'success');
    });

    resetBtn.addEventListener('click', () => {
        const confirmReset = confirm("Are you sure you want to reset your balance to ₹0?");
        
        if (confirmReset) {
            const today = getLocalYYYYMMDD(new Date());
            saveData(0, today);
            renderBalance(0);
            showNotification('Balance reset successfully.', 'success');
        }
    });

    // --- Date Utility Functions ---
    
    function getLocalYYYYMMDD(dateObj) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCalendarDaysDifference(dateStr1, dateStr2) {
        const [y1, m1, d1] = dateStr1.split('-').map(Number);
        const [y2, m2, d2] = dateStr2.split('-').map(Number);

        // Create date objects strictly at local midnight
        const date1 = new Date(y1, m1 - 1, d1);
        const date2 = new Date(y2, m2 - 1, d2);

        // Calculate exact difference in milliseconds and convert to days
        const diffTime = date2.getTime() - date1.getTime();
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
    }

    // --- UI Utility Functions ---
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = `notification show ${type}`;

        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }

        notificationTimeout = setTimeout(() => {
            notification.className = 'notification hidden';
        }, 3000);
    }
});