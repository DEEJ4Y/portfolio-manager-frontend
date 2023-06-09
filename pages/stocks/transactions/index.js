import DashAppShell from "@/components/AppShell";
import { Badge, Button, Group, Table, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { Plus } from "tabler-icons-react";

export default function CryptoTransactionsPage() {
  const [stockTransactions] = useLocalStorage({
    key: "transactions/stocks",
    defaultValue: [],
    deserialize: JSON.parse,
  });

  stockTransactions.sort((a, b) => {
    const aDate = new Date(a.timestamp);
    const bDate = new Date(b.timestamp);

    return aDate > bDate;
  });

  return (
    <DashAppShell>
      <Group position="apart">
        <Title mb="md">My Transactions</Title>
        <Link href="/crypto/transactions/add-one">
          <Button leftIcon={<Plus size={16} />}>Add Transaction</Button>
        </Link>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Quantity</th>
            <th>Order Value</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {stockTransactions.map((transaction, idx) => {
            return (
              <tr key={`transaction-${idx}-${transaction.timestamp}`}>
                <td>{transaction.symbol}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.orderValue}</td>
                <td>
                  <Badge color={transaction.type === "BUY" ? "green" : "red"}>
                    {transaction.type}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </DashAppShell>
  );
}
