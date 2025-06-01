"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { format, parseISO } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartConfig = {
  dollars: {
    label: "Dollars",
  },
  spending: {
    label: "Spending",
    color: "#e6067a",
  },
  budget: {
    label: "Budget",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type CategorySpending = {
  category: string;
  amount: number;
};

type MonthlySpending = {
  period: string;
    total: number;
    budget: number;
  categories?: CategorySpending[];
};

type AreaBudgetChartProps = {
  data: MonthlySpending[];
};

export function AreaBudgetChart({ data }: AreaBudgetChartProps) {
  const [timeRange, setTimeRange] = React.useState("360d")

  const filteredData = data.filter((item) => {
      const itemDate = parseISO(`${item.period}`); // Ensure it's a full date
      // console.log(itemDate);
      const referenceDate = new Date();
      // console.log(referenceDate);

      let daysToSubtract = 360;
      switch (timeRange) {
        case "7d":
          daysToSubtract = 7;
          break;
        case "30d":
          daysToSubtract = 30;
          break;
        case "90d":
          daysToSubtract = 90;
          break;
        case "180d":
          daysToSubtract = 180;
          break;
        case "360d":
        default:
          daysToSubtract = 360;
          break;
      }

      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);

      return itemDate >= startDate;
    }).map(i => ({
        date: i.period,
        spending: i.total,
        budget: i.budget
    }));

  return (
    <Card className="pt-0 w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Spending vs Budget</CardTitle>
          <CardDescription>
            Showing total dollars spent compared to budget for the last {timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 12 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="360d" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSpending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#ffc1e3"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBudget" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = parseISO(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return parseISO(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="budget"
              type="natural"
              fill="url(#fillBudget)"
              stroke="var(--color-chart-2)"
              stackId="a"
            />
            <Area
              dataKey="spending"
              type="natural"
              fill="url(#fillSpending)"
              stroke="#22c55e"
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
