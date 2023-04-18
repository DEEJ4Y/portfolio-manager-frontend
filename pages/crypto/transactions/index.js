import DashAppShell from "@/components/AppShell";
import { useEffect } from "react";
import { Badge, Button, Group, Table, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { Plus } from "tabler-icons-react";
import axios from "axios";

export default function CryptoTransactionsPage() {
  const [cryptoTransactions, setCryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
    deserialize: JSON.parse,
  });
  const [userDetailsData, setUserDetailsData] = useLocalStorage({
    key: "userDetails",
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  let flag = true;
  flag = false;
  // useEffect(() => {
  //   const postData = async () => {
  //     try {
  //       const URL = process.env.NEXT_PUBLIC_API_URL;
  //       const apiUrl = `${URL}/api/crypto/get`;
  //       console.log(apiUrl, URL);
  //       const { data } = await axios.get(apiUrl, {
  //         headers: {
  //           Authorization: `Bearer ${userDetailsData?.accessToken}`,
  //         },
  //       });
  //       setCryptoTransactions(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   postData();
  // }, []);

  cryptoTransactions.sort((a, b) => {
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
            <th>Currency</th>
            <th>Quantity</th>
            <th>Order Value</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {cryptoTransactions.map((transaction, idx) => {
            return (
              <tr key={`transaction-${idx}-${transaction.timestamp}`}>
                <td>{transaction.currency}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.orderValue}</td>
                <td>
                  <Badge color={transaction.type === "BUY" ? "green" : "red"}>
                    {transaction.type || "SELL"}
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
