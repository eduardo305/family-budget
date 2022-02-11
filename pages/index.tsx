import type { NextPage } from "next";
import Head from "next/head";
import { Expense } from "../types";
import { currencyFormatter } from "../utils/currencyFormatter";

interface BudgetsPageProps {
  expenses: Expense[];
}

const BudgetsPage: NextPage<BudgetsPageProps> = ({ expenses }) => {
  return (
    <div className="m-4">
      <Head>
        <title>Family Budget</title>
        <meta name="description" content="App for control family budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-white border rounded-lg overflow-hidden flex flex-col justify-center divide-y divide-slate-200">
          <div className="flex flex-col self-center p-6">
            <p className="text-slate-600">Total:</p>
            <p className="text-6xl block">
              {currencyFormatter(
                expenses.reduce((total, expense) => {
                  return total + expense.amount;
                }, 0)
              )}
            </p>
          </div>
          <ul className="divide-y divide-slate-200 bg-white">
            {expenses.map((expense) => {
              return (
                <li key={expense.name} className="p-6 flex justify-between">
                  <div>{expense.name}</div>
                  <div>{currencyFormatter(expense.amount)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const response = await (
    await fetch(`http://localhost:3000/api/expenses`)
  ).json();

  // Pass data to the page via props
  return {
    props: {
      expenses: response.expenses,
    },
  };
}

export default BudgetsPage;
