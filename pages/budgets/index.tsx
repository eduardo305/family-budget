import type { NextPage } from "next";
import Head from "next/head";
import { currencyFormatter } from "../../utils/currencyFormatter";
import "react-spring-bottom-sheet/dist/style.css";
import Link from "next/link";

interface BudgetsPageProps {
  budgets: any[];
}

const BudgetsPage: NextPage<BudgetsPageProps> = ({ budgets }) => {
  return (
    <div className="m-4">
      <Head>
        <title>Family Budget</title>
        <meta name="description" content="App for control family budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-white border rounded-lg overflow-hidden flex flex-col justify-center divide-y divide-slate-200">
          <ul>
            {budgets.map(({ name, amount, _id }) => {
              return (
                <li className="flex flex-col p-6" key={_id}>
                  <Link href={`/budgets/${_id}`}>
                    <a>
                      <div className="">{name}</div>
                      <div className="divide-y divide-slate-200 bg-white">
                        {currencyFormatter(amount)}
                      </div>
                    </a>
                  </Link>
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
  const budgets = await (
    await fetch(`${process.env.BASE_API_HOST}/api/budgets`)
  ).json();

  // Pass data to the page via props
  return {
    props: {
      budgets,
    },
  };
}

export default BudgetsPage;
