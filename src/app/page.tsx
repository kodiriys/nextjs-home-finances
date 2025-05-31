import { promises as fs } from "fs";
import path from "path";
// import { DonutChart } from "@/components/DonutChart";
import { DonutSpendingChart } from "@/components/DonutSpendingChart";

import { HandCoins, Baby } from "lucide-react"

import Image from "next/image";

type CategorySpending = {
  category: string
  amount: number
}

type MonthlySpending = {
  period: string
  categories: CategorySpending[]
}

export default async function Home() {
    const filePath = path.join(process.cwd(), "public", "spending.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const spendingData: MonthlySpending[] = JSON.parse(fileContents);


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex flex-row gap-4 items-center justify-start w-full text-4xl">
                    <HandCoins className="size-9" />
                    <Baby className="size-9" />
                    <span className="font-bold">Family Finance Dashboard</span>
                </div>

                <span className="text-sm font-light font-[family-name:var(--font-geist-mono)]">Made by Suhayl Kodiriy</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* <DonutChart /> */}
                    {spendingData.map(({ period, categories }, i) => {
                        // const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
                        const previousTotal =
                            i > 0
                                ? spendingData[i - 1].categories.reduce((sum, cat) => sum + cat.amount, 0)
                                : undefined;

                      return (
                        <DonutSpendingChart
                          key={period}
                          data={categories}
                          period={period}
                          previousTotal={previousTotal}
                        />
                      )
                    })}
                </div>

            </main>

        </div>
    );
}
