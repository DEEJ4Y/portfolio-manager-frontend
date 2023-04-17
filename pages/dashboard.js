import DashAppShell from "@/components/AppShell";
import { useLocalStorage } from "@mantine/hooks";

export default function DashboardPage() {
  const [cryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
  });
  const [stockTransactions] = useLocalStorage({
    key: "transactions/stock",
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

  return (
    <DashAppShell>
      {JSON.stringify({
        cryptoTransactions,
        stockTransactions,
        mutualFundTransactions,
        fixedDepositTransactions,
        realEstate,
        goals,
      })}
      <div></div>
    </DashAppShell>
  );
}
