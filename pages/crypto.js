import DashAppShell from "@/components/AppShell";
import { useLocalStorage } from "@mantine/hooks";
import { Button, Group, Text, Title } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import Link from "next/link";

export default function CryptoPage() {
  const [cryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
  });

  return (
    <DashAppShell>
      {JSON.stringify({ cryptoTransactions })}
      <div>
        <Title>Crypto Holdings</Title>
        <Group position="apart">
          <Text>
            {cryptoTransactions.length > 0
              ? `You have ${cryptoTransactions.length} transactions.`
              : "You have no crypto holdings."}
          </Text>
          <Group>
            <Link href="/crypto/transactions/add-one">
              <Button leftIcon={<Plus size={16} />}>Add Transaction</Button>
            </Link>
          </Group>
        </Group>
      </div>
    </DashAppShell>
  );
}
