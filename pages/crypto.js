import DashAppShell from "@/components/AppShell";
import { useLocalStorage } from "@mantine/hooks";
import {
  Button,
  Card,
  Container,
  Center,
  Grid,
  Group,
  RingProgress,
  Text,
  Title,
  Table,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCryptoData } from "@/utils/crypto/prices";

export default function CryptoPage() {
  const [cryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  let data = {
    totalInvestedValue: 0,
    totalProfitAndLoss: 0,
    unrealizedProfitAndLoss: 0,
    totalInstruments: 0,
    instrumentData: {},
  };

  const [values, setValues] = useState(data);

  useEffect(() => {
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

    setValues(() => data);
  }, [cryptoTransactions]);

  const profitPercent =
    ((values.totalProfitAndLoss + values.unrealizedProfitAndLoss) /
      (values.totalInvestedValue +
        values.totalProfitAndLoss +
        values.unrealizedProfitAndLoss)) *
    100;
  const investmentPercent =
    (values.totalInvestedValue /
      (values.totalInvestedValue +
        values.totalProfitAndLoss +
        values.unrealizedProfitAndLoss)) *
    100;

  return (
    <DashAppShell>
      <div>
        <Title mb="md">Cryptocurrency</Title>

        <Grid mb="md">
          <DashColCard
            type="text"
            label={`₹${values.totalInvestedValue}`}
            title="Invested Amount"
          />
          <DashColCard
            type="text"
            label={cryptoTransactions.length}
            title="Transactions"
          />
          <DashColCard
            type="text"
            label={`₹${values.totalProfitAndLoss}`}
            labelColor={values.totalProfitAndLoss >= 0 ? "green" : "red"}
            title="Realized Profit"
          />
          <DashColCard
            type="text"
            label={`₹${Number(values.unrealizedProfitAndLoss).toFixed(2)}`}
            labelColor={values.unrealizedProfitAndLoss >= 0 ? "green" : "red"}
            title="Unrealized Profit"
          />
          <DashColCard
            type="text"
            label={`₹${Number(
              values.totalProfitAndLoss + values.unrealizedProfitAndLoss
            ).toFixed(2)}`}
            labelColor={
              values.totalProfitAndLoss + values.unrealizedProfitAndLoss >= 0
                ? "green"
                : "red"
            }
            title="Net Profit Absolute"
          />
          <DashColCard
            label={profitPercent ? `${profitPercent.toFixed(2)}%` : "0%"}
            sections={[
              {
                value: profitPercent.toFixed(2),
                color: values.totalProfitAndLoss >= 0 ? "green" : "red",
                tooltip:
                  profitPercent.toFixed(2) >= 0
                    ? `Profit ${profitPercent.toFixed(2)}%`
                    : `Loss ${profitPercent.toFixed(2)}%`,
              },
              {
                value: investmentPercent.toFixed(2),
                color: "blue",
                tooltip: `Invested ${investmentPercent.toFixed(2)}%`,
              },
            ]}
            title="Net Profit Percentage"
          />
        </Grid>

        <Group position="apart" mb="md">
          <Text>
            {values.totalInstruments > 0
              ? `You have ${values.totalInstruments} holdings.`
              : "You have no crypto holdings."}
          </Text>
          <Group>
            <Link href="/crypto/transactions">
              <Button>My Transactions</Button>
            </Link>
            <Link href="/crypto/transactions/add-one">
              <Button leftIcon={<Plus size={16} />}>Add Transaction</Button>
            </Link>
          </Group>
        </Group>

        <Table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Currency</th>
              <th>Quantity</th>
              <th>Invested Amount</th>
              <th>Average price</th>
              <th>YTP</th>
              <th>Realized Profit</th>
              <th>Unrealized Profit</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(values.instrumentData).map((key, idx) => {
              const instrumentData = values.instrumentData[key];
              const avgBuyPrice =
                instrumentData.totalValue / instrumentData.totalQuantity;

              const crypto = getCryptoData(instrumentData.currency);

              let price = Number(crypto.Price.slice(1).replace(",", "")) * 82;

              const profit = price - avgBuyPrice;
              return (
                <tr key={`${key}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{instrumentData.currency}</td>
                  <td>{instrumentData.totalQuantity}</td>
                  <td>{instrumentData.totalValue}</td>
                  <td>
                    {instrumentData.totalValue / instrumentData.totalQuantity ||
                      "-"}
                  </td>
                  <td>
                    <Text color={price >= 0 ? "green" : "red"}>
                      {price || "-"}
                    </Text>
                  </td>
                  <td>
                    <Text color={instrumentData.profit >= 0 ? "green" : "red"}>
                      {instrumentData.profit}
                    </Text>
                  </td>
                  <td>
                    <Text color={profit >= 0 ? "green" : "red"}>
                      {profit || "-"}
                    </Text>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
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
              {label}
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
                {label}
              </Text>
            }
            sections={sections}
          />
        </Center>
        <Text align="center" weight={700} size="lg">
          {title}
        </Text>
      </Card>
    </Grid.Col>
  );
};
