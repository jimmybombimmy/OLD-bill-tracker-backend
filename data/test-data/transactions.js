// transactions.js

const transactions = [
  // User 1 transactions
  {
    user_id: 1,
    name: "Rent Payment",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 1,
    name: "Netflix Subscription",
    type: 2, // Standing Order
    frequency: "monthly",
  },
  {
    user_id: 1,
    name: "Electricity Bill",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 1,
    name: "Gym Membership",
    type: 3, // Recurring Payment
    frequency: "weekly",
  },

  // User 2 transactions
  {
    user_id: 2,
    name: "Credit Card Payment",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 2,
    name: "Music Streaming Service",
    type: 2, // Standing Order
    frequency: "monthly",
  },
  {
    user_id: 2,
    name: "Water Bill",
    type: 1, // Direct Debit
    frequency: "quarterly",
  },
  {
    user_id: 2,
    name: "Magazine Subscription",
    type: 3, // Recurring Payment
    frequency: "monthly",
  },

  // User 3 transactions
  {
    user_id: 3,
    name: "Internet Subscription",
    type: 2, // Standing Order
    frequency: "monthly",
  },
  {
    user_id: 3,
    name: "Car Loan Payment",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 3,
    name: "Health Insurance Premium",
    type: 1, // Direct Debit
    frequency: "quarterly",
  },
  {
    user_id: 3,
    name: "Weekly Groceries",
    type: 3, // Recurring Payment
    frequency: "weekly",
  },

  // User 4 transactions
  {
    user_id: 4,
    name: "Mortgage Payment",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 4,
    name: "Mobile Phone Bill",
    type: 1, // Direct Debit
    frequency: "biannual",
  },
  {
    user_id: 4,
    name: "Video Streaming Service",
    type: 2, // Standing Order
    frequency: "monthly",
  },

  // User 5 transactions
  {
    user_id: 5,
    name: "Student Loan Payment",
    type: 1, // Direct Debit
    frequency: "monthly",
  },
  {
    user_id: 5,
    name: "Charity Donation",
    type: 2, // Standing Order
    frequency: "quarterly",
  },
  {
    user_id: 5,
    name: "Dental Checkup",
    type: 3, // Recurring Payment
    frequency: "biannual",
  },
  // Add more transactions for other users here...
];

module.exports = transactions;
