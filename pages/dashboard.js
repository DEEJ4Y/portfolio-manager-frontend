import DashAppShell from "@/components/AppShell";
import { getCryptoData } from "@/utils/crypto/prices";
import { getStockData } from "@/utils/stocks/prices";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import {
  Card,
  Container,
  Center,
  Grid,
  RingProgress,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [userDetailsData, setUserDetailsData] = useLocalStorage({
    key: "userDetails",

    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  if (userDetailsData === null) {
    router.push("/login");
  }
  const [cryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
  });
  const [stockTransactions] = useLocalStorage({
    key: "transactions/stocks",
    defaultValue: [],
  });
  const [mutualFundTransactions] = useLocalStorage({
    key: "transactions/mutualFund",
    defaultValue: [],
  });
  const [fixedDepositTransactions] = useLocalStorage({
    key: "transactions/fixedDeposit",
    defaultValue: [],
  });
  const [realEstate] = useLocalStorage({
    key: "realEstate",
    defaultValue: [],
  });
  const [goals] = useLocalStorage({
    key: "goals",
    defaultValue: [],
  });

  const [data, setData] = useState({
    cryptoPAndL: null,
    stocksPAndL: null,
  });

  const calculateCryptoPAndL = () => {
    let data = {
      totalInvestedValue: 0,
      totalProfitAndLoss: 0,
      unrealizedProfitAndLoss: 0,
      totalInstruments: 0,
      instrumentData: {},
    };
    cryptoTransactions.forEach((transaction) => {
      if (transaction.type === "BUY") {
        const transactionValue =
          Number(transaction.quantity) * Number(transaction.orderValue);
        // data.totalInvestedValue += transactionValue;
        if (!data.instrumentData[transaction.currency]) {
          data.totalInstruments += 1;
          data.instrumentData[transaction.currency] = {
            currency: transaction.currency,
            totalQuantity: Number(transaction.quantity),
            totalValue:
              Number(transaction.orderValue) * Number(transaction.quantity),
            profit: 0,
          };
        } else {
          data.instrumentData[transaction.currency].totalQuantity += Number(
            transaction.quantity
          );
          data.instrumentData[transaction.currency].totalValue +=
            transactionValue;
        }
      } else if (transaction.type === "SELL") {
        const avgPriceBeforeSell =
          data.instrumentData[transaction.currency].totalValue /
          data.instrumentData[transaction.currency].totalQuantity;
        const sellValue = Number(transaction.orderValue);

        const profit =
          avgPriceBeforeSell *
            data.instrumentData[transaction.currency].totalQuantity -
          sellValue * Number(transaction.quantity);

        if (sellValue > avgPriceBeforeSell) {
          data.totalProfitAndLoss -= profit;
          data.instrumentData[transaction.currency].profit -= profit;
        } else {
          data.totalProfitAndLoss += profit;
          data.instrumentData[transaction.currency].profit += profit;
        }

        data.totalInvestedValue -= avgPriceBeforeSell * transaction.quantity;
        data.instrumentData[transaction.currency].totalQuantity -= Number(
          transaction.quantity
        );
        data.instrumentData[transaction.currency].totalValue -=
          avgPriceBeforeSell * transaction.quantity;

        if (data.instrumentData[transaction.currency].totalQuantity <= 0) {
          data.totalInstruments -= 1;
        }
      }
    });

    let _totalInvested = 0,
      _totalProfit = 0,
      _totalUnrealized = 0;
    Object.keys(data.instrumentData).forEach((key) => {
      const instrumentData = data.instrumentData[key];

      const avgBuyPrice =
        instrumentData.totalValue / instrumentData.totalQuantity;

      const crypto = getCryptoData(instrumentData.currency);

      let price = Number(crypto.Price.slice(1).replace(",", "")) * 82;

      const profit = price - avgBuyPrice;

      if (avgBuyPrice) _totalUnrealized += profit;

      _totalInvested += Number(instrumentData.totalValue);
      _totalProfit += Number(instrumentData.profit);
    });

    data.totalInvestedValue = _totalInvested;
    data.totalProfitAndLoss = _totalProfit;
    data.unrealizedProfitAndLoss = _totalUnrealized;

    const profitPercent =
      ((data.totalProfitAndLoss + data.unrealizedProfitAndLoss) /
        (data.totalInvestedValue +
          data.totalProfitAndLoss +
          data.unrealizedProfitAndLoss)) *
      100;
    const investmentPercent =
      (data.totalInvestedValue /
        (data.totalInvestedValue +
          data.totalProfitAndLoss +
          data.unrealizedProfitAndLoss)) *
      100;

    return {
      ...data,
      profitPercent,
      investmentPercent,
    };
  };

  const calculateStocksPAndL = () => {
    let data = {
      totalInvestedValue: 0,
      totalProfitAndLoss: 0,
      unrealizedProfitAndLoss: 0,
      totalInstruments: 0,
      instrumentData: {},
    };
    stockTransactions.forEach((transaction) => {
      if (transaction.type === "BUY") {
        const transactionValue =
          Number(transaction.quantity) * Number(transaction.orderValue);
        // data.totalInvestedValue += transactionValue;
        if (!data.instrumentData[transaction.symbol]) {
          data.totalInstruments += 1;
          data.instrumentData[transaction.symbol] = {
            symbol: transaction.symbol,
            totalQuantity: Number(transaction.quantity),
            totalValue:
              Number(transaction.orderValue) * Number(transaction.quantity),
            profit: 0,
          };
        } else {
          data.instrumentData[transaction.symbol].totalQuantity += Number(
            transaction.quantity
          );
          data.instrumentData[transaction.symbol].totalValue +=
            transactionValue;
        }
      } else if (transaction.type === "SELL") {
        if (data.instrumentData[transaction.symbol]) {
          const avgPriceBeforeSell =
            data.instrumentData[transaction.symbol].totalValue /
            data.instrumentData[transaction.symbol].totalQuantity;
          const sellValue = Number(transaction.orderValue);

          const profit =
            avgPriceBeforeSell *
              data.instrumentData[transaction.symbol].totalQuantity -
            sellValue * Number(transaction.quantity);

          if (sellValue > avgPriceBeforeSell) {
            data.totalProfitAndLoss -= profit;
            data.instrumentData[transaction.symbol].profit -= profit;
          } else {
            data.totalProfitAndLoss += profit;
            data.instrumentData[transaction.symbol].profit += profit;
          }

          data.totalInvestedValue -= avgPriceBeforeSell * transaction.quantity;
          data.instrumentData[transaction.symbol].totalQuantity -= Number(
            transaction.quantity
          );
          data.instrumentData[transaction.symbol].totalValue -=
            avgPriceBeforeSell * transaction.quantity;

          if (data.instrumentData[transaction.symbol].totalQuantity <= 0) {
            data.totalInstruments -= 1;
          }
        }
      }
    });

    let _totalInvested = 0,
      _totalProfit = 0,
      _totalUnrealized = 0;
    Object.keys(data.instrumentData).forEach((key) => {
      const instrumentData = data.instrumentData[key];

      const avgBuyPrice =
        instrumentData.totalValue / instrumentData.totalQuantity;

      const stock = getStockData(instrumentData.symbol);

      let price = parseFloat(stock.CLOSE).toFixed(2);

      const profit = price - avgBuyPrice;

      if (avgBuyPrice) _totalUnrealized += profit;

      _totalInvested += Number(instrumentData.totalValue);
      _totalProfit += Number(instrumentData.profit);
    });

    data.totalInvestedValue = _totalInvested;
    data.totalProfitAndLoss = _totalProfit;
    data.unrealizedProfitAndLoss = _totalUnrealized;

    const profitPercent =
      ((data.totalProfitAndLoss + data.unrealizedProfitAndLoss) /
        (data.totalInvestedValue +
          data.totalProfitAndLoss +
          data.unrealizedProfitAndLoss)) *
      100;
    const investmentPercent =
      (data.totalInvestedValue /
        (data.totalInvestedValue +
          data.totalProfitAndLoss +
          data.unrealizedProfitAndLoss)) *
      100;

    return {
      ...data,
      profitPercent,
      investmentPercent,
    };
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        cryptoPAndL: calculateCryptoPAndL(),
        stocksPAndL: calculateStocksPAndL(),
      };
    });
  }, [stockTransactions, cryptoTransactions]);

  const totalInvested =
    Number(data.cryptoPAndL?.totalInvestedValue) +
    Number(data.stocksPAndL?.totalInvestedValue);

  const totalRealizedProfit =
    Number(data.cryptoPAndL?.totalProfitAndLoss) +
    Number(data.stocksPAndL?.totalProfitAndLoss);

  const totalUnrealizedProfit =
    Number(data.cryptoPAndL?.unrealizedProfitAndLoss) +
    Number(data.stocksPAndL?.unrealizedProfitAndLoss);

  const totalNetProfit = totalRealizedProfit + totalUnrealizedProfit;

  return (
    <DashAppShell>
      <Grid>
        <DashColCard
          type="text"
          label={`₹${totalInvested.toFixed(2)}`}
          title="Total Investment"
        />
        <DashColCard
          type="text"
          label={`₹${totalRealizedProfit.toFixed(2)}`}
          title="Total Realized Profit"
          labelColor={totalRealizedProfit >= 0 ? "green" : "red"}
        />
        <DashColCard
          type="text"
          label={`₹${totalUnrealizedProfit.toFixed(2)}`}
          title="Total Unrealized Profit"
          labelColor={totalUnrealizedProfit >= 0 ? "green" : "red"}
        />
        <DashColCard
          type="text"
          label={`₹${totalNetProfit.toFixed(2)}`}
          title="Total Net Profit"
          labelColor={totalNetProfit >= 0 ? "green" : "red"}
        />
        <DashColCard
          label="100%"
          sections={[
            {
              tooltip: `Crypto ${(
                (Number(data.cryptoPAndL?.totalInvestedValue) * 100) /
                totalInvested
              ).toFixed(2)}%`,
              value:
                (Number(data.cryptoPAndL?.totalInvestedValue) * 100) /
                totalInvested,
              color: "yellow",
            },
            {
              tooltip: `Stocks ${(
                (Number(data.stocksPAndL?.totalInvestedValue) * 100) /
                totalInvested
              ).toFixed(2)}%`,
              value: (
                (Number(data.stocksPAndL?.totalInvestedValue) * 100) /
                totalInvested
              ).toFixed(2),
              color: "blue",
            },
          ]}
          title="Assets"
        />
        <DashColCard
          label={`${((totalRealizedProfit * 100) / totalInvested).toFixed(2)}%`}
          sections={[
            {
              tooltip: `Crypto ${(
                (Number(data.cryptoPAndL?.totalProfitAndLoss) * 100) /
                totalRealizedProfit
              ).toFixed(2)}%`,
              value:
                (Number(data.cryptoPAndL?.totalProfitAndLoss) * 100) /
                totalRealizedProfit,
              color: "cyan",
            },
            {
              tooltip: `Stocks ${(
                (Number(data.stocksPAndL?.totalProfitAndLoss) * 100) /
                totalRealizedProfit
              ).toFixed(2)}%`,
              value: (
                (Number(data.stocksPAndL?.totalProfitAndLoss) * 100) /
                totalRealizedProfit
              ).toFixed(2),
              color: "red",
            },
          ]}
          title="Total Realized Profit"
        />
        <DashColCard
          label={`${((totalUnrealizedProfit * 100) / totalInvested).toFixed(
            2
          )}%`}
          sections={[
            {
              tooltip: `Crypto ${(
                (Number(data.cryptoPAndL?.unrealizedProfitAndLoss) * 100) /
                totalUnrealizedProfit
              ).toFixed(2)}%`,
              value:
                (Number(data.cryptoPAndL?.unrealizedProfitAndLoss) * 100) /
                totalUnrealizedProfit,
              color: "orange",
            },
            {
              tooltip: `Stocks ${(
                (Number(data.stocksPAndL?.unrealizedProfitAndLoss) * 100) /
                totalUnrealizedProfit
              ).toFixed(2)}%`,
              value: (
                (Number(data.stocksPAndL?.unrealizedProfitAndLoss) * 100) /
                totalUnrealizedProfit
              ).toFixed(2),
              color: "purple",
            },
          ]}
          title="Total Unrealized Profit"
        />
        <DashColCard
          label={`${((totalNetProfit * 100) / totalInvested).toFixed(2)}%`}
          sections={[
            {
              tooltip: `Crypto ${(
                ((Number(data.cryptoPAndL?.unrealizedProfitAndLoss) +
                  Number(data.cryptoPAndL?.totalProfitAndLoss)) *
                  100) /
                totalNetProfit
              ).toFixed(2)}%`,
              value:
                ((Number(data.cryptoPAndL?.unrealizedProfitAndLoss) +
                  Number(data.cryptoPAndL?.totalProfitAndLoss)) *
                  100) /
                totalNetProfit,
              color: "orange",
            },
            {
              tooltip: `Stocks ${(
                ((Number(data.stocksPAndL?.unrealizedProfitAndLoss) +
                  Number(data.stocksPAndL?.totalProfitAndLoss)) *
                  100) /
                totalNetProfit
              ).toFixed(2)}%`,
              value: (
                ((Number(data.stocksPAndL?.unrealizedProfitAndLoss) +
                  Number(data.stocksPAndL?.totalProfitAndLoss)) *
                  100) /
                totalNetProfit
              ).toFixed(2),
              color: "cyan",
            },
          ]}
          title="Total Net Profit"
        />
      </Grid>
    </DashAppShell>
  );
}

export const DashColCard = ({ label, sections, title, type, labelColor }) => {
  if (type === "text")
    return (
      <Grid.Col xl={3} lg={4} md={6}>
        <Card>
          <Container
            display="flex"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 186,
            }}
          >
            <Text align="center" weight={700} size={48} color={labelColor}>
              {label || ""}
            </Text>
          </Container>
          <Text align="center" weight={700} size="lg">
            {title}
          </Text>
        </Card>
      </Grid.Col>
    );

  return (
    <Grid.Col xl={3} lg={4} md={6}>
      <Card>
        <Center>
          <RingProgress
            size={186}
            label={
              <Text align="center" weight={700} size="xl">
                {label || ""}
              </Text>
            }
            sections={sections || []}
          />
        </Center>
        <Text align="center" weight={700} size="lg">
          {title}
        </Text>
      </Card>
    </Grid.Col>
  );
};
