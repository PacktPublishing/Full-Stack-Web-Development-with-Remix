import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const expenses = [
  {
    title: 'Groceries',
    amount: 50,
    date: '2022-12-05',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    date: '2022-12-03',
  },
  {
    title: 'Movies',
    amount: 20,
    date: '2022-12-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    date: '2022-11-01',
  },
  {
    title: 'Rent December',
    amount: 1000,
    date: '2022-12-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    date: '2022-12-01',
  },
  {
    title: 'Takeout',
    amount: 55,
    date: '2022-11-30',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    date: '2022-11-03',
  },
  {
    title: 'Groceries',
    amount: 15,
    date: '2022-11-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    date: '2022-11-01',
  },
  {
    title: 'Rent November',
    amount: 1000,
    date: '2022-11-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    date: '2022-10-30',
  },
  {
    title: 'Groceries',
    amount: 55,
    date: '2022-10-15',
  },
  {
    title: 'Dinner',
    amount: 40,
    date: '2022-10-11',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    date: '2022-10-03',
  },
  {
    title: 'Groceries',
    amount: 25,
    date: '2022-10-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    date: '2022-10-01',
  },
  {
    title: 'Rent October',
    amount: 1000,
    date: '2022-10-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    date: '2022-10-01',
  },
];

const income = [
  {
    title: 'Salary December',
    amount: 2500,
    date: '2022-12-30',
  },
  {
    title: 'Salary November',
    amount: 2500,
    date: '2022-11-30',
  },
  {
    title: 'Salary October',
    amount: 2500,
    date: '2022-10-30',
  },
  {
    title: 'Salary September',
    amount: 2500,
    date: '2022-09-30',
  },
];

async function seed() {
  const start = performance.now();
  const expensePromises = expenses.map((expense) => createExpense(expense));
  const invoicePromises = income.map((income) => createInvoice(income));
  await Promise.all([...expensePromises, ...invoicePromises]);
  const end = performance.now();
  console.log(`🚀 Seeded the database. Done in ${Math.round(end - start)}ms`);
}

function createExpense(expenseData: typeof expenses[number]) {
  return db.expense.create({
    data: {
      title: expenseData.title,
      amount: expenseData.amount,
      createdAt: new Date(expenseData.date),
    },
  });
}

function createInvoice(incomeData: typeof income[number]) {
  return db.invoice.create({
    data: {
      title: incomeData.title,
      amount: incomeData.amount,
      createdAt: new Date(incomeData.date),
    },
  });
}

seed();
