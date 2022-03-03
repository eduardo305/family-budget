import type { NextPage } from "next";
import Head from "next/head";
import "react-spring-bottom-sheet/dist/style.css";
import { Expense } from "../../types";
import { currencyFormatter } from "../../utils/currencyFormatter";

interface BudgetsPageProps {
  expenses: Expense[];
  totalSpent: number;
}

const BudgetsPage: NextPage<BudgetsPageProps> = ({ expenses, totalSpent }) => {
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
            <p className="text-6xl block">{currencyFormatter(totalSpent)}</p>
          </div>
          <ul className="divide-y divide-slate-200 bg-white">
            {expenses.map((expense, i) => {
              return (
                <li key={i} className="p-6 flex justify-between">
                  <div>{expense.name}</div>
                  <div>
                    <div>{currencyFormatter(expense.amount)}</div>
                    <div>{expense.date}</div>
                  </div>
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
export async function getServerSideProps({ params }: any) {
  // Fetch data from external API
  const { description, expenses, totalSpent } = await (
    await fetch(`${process.env.BASE_API_HOST}/api/budgets/${params.id}`)
  ).json();

  // Pass data to the page via props
  return {
    props: {
      description,
      expenses,
      totalSpent,
    },
  };
}

export default BudgetsPage;
