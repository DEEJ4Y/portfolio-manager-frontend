import DashAppShell from "@/components/AppShell";
import { insertCryptoTransaction } from "@/services/crypto/local";
import cryptocurrencies from "@/utils/crypto/cryptocurrencies";
import {
  Button,
  Checkbox,
  Container,
  Input,
  Select,
  Stack,
  Tabs,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Minus, Plus } from "tabler-icons-react";

export default function AddOneCryptoTransaction() {
  return (
    <DashAppShell>
      <Tabs defaultValue="buy">
        <Tabs.List mb="sm">
          <Tabs.Tab value="buy" left={<Plus size={16} />}>
            Buy
          </Tabs.Tab>
          <Tabs.Tab value="sell" right={<Minus size={16} />}>
            Sell
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="buy">
          <BuyForm />
        </Tabs.Panel>
        <Tabs.Panel value="sell">
          <SellForm />
        </Tabs.Panel>
      </Tabs>
    </DashAppShell>
  );
}

const BuyForm = () => {
  const router = useRouter();

  const [cryptoTransactions, setCryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const form = useForm({
    initialValues: {
      currency: null,
      quantity: 0,
      orderValue: 0,
      withCustomDate: false,
      timestamp: new Date(),
      loading: false,
      type: "BUY",
    },
    validate: {
      currency: (value) =>
        value && value.length > 0 ? null : "Currency is required.",
      quantity: (value) =>
        value && value > 0 ? null : "Quantity should be more than zero.",
      orderValue: (value) =>
        value && value > 0 ? null : "Order value should be more than zero.",
      timestamp: (value) =>
        value && value < new Date()
          ? null
          : "Date and time cannot be in the future.",
    },
  });

  const addTransaction = () => {
    const validationStatus = form.validate();

    if (!form.values.loading && !validationStatus.hasErrors) {
      form.setFieldValue("loading", true);

      const inserted = insertCryptoTransaction(form.values, cryptoTransactions);

      if (!inserted) {
        form.setFieldValue("loading", false);
      } else {
        notifications.show({
          message: "Transaction added successfully!",
          color: "green",
        });
        form.setFieldValue("loading", false);
        setCryptoTransactions(() => [...inserted]);
        router.push("/crypto");
      }
    }
  };

  return (
    <Container w={400} m={0} fluid>
      <Title mb="sm">Buy Order</Title>
      <Stack spacing="xs">
        <Select
          label="Currency"
          placeholder="Pick one"
          searchable
          name="currency"
          data={cryptocurrencies}
          {...form.getInputProps("currency")}
        />
        <Input.Wrapper label="Quantity" {...form.getInputProps("quantity")}>
          <Input
            name="quantity"
            type="number"
            min={0}
            {...form.getInputProps("quantity")}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Order Value"
          {...form.getInputProps("orderValue")}
        >
          <Input
            name="orderValue"
            type="number"
            min={0}
            {...form.getInputProps("orderValue")}
          />
        </Input.Wrapper>
        <Checkbox
          label="Custom Date and Time"
          {...form.getInputProps("withCustomDate", { type: "checkbox" })}
        />
        {form.values.withCustomDate ? (
          <DateTimePicker
            label="Transaction Date and Time"
            placeholder="Now"
            {...form.getInputProps("timestamp")}
          />
        ) : (
          ""
        )}
        <Button disabled={form.values.loading} onClick={addTransaction}>
          Add Transaction
        </Button>
      </Stack>
    </Container>
  );
};

const SellForm = () => {
  const router = useRouter();

  const [cryptoTransactions, setCryptoTransactions] = useLocalStorage({
    key: "transactions/crypto",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const form = useForm({
    initialValues: {
      currency: null,
      quantity: 0,
      orderValue: 0,
      withCustomDate: false,
      timestamp: new Date(),
      loading: false,
      type: "SELL",
    },
    validate: {
      currency: (value) =>
        value && value.length > 0 ? null : "Currency is required.",
      quantity: (value) =>
        value && value > 0 ? null : "Quantity should be more than zero.",
      orderValue: (value) =>
        value && value > 0 ? null : "Order value should be more than zero.",
      timestamp: (value) =>
        value && value < new Date()
          ? null
          : "Date and time cannot be in the future.",
    },
  });

  const addTransaction = () => {
    const validationStatus = form.validate();

    if (!form.values.loading && !validationStatus.hasErrors) {
      form.setFieldValue("loading", true);

      const inserted = insertCryptoTransaction(form.values, cryptoTransactions);

      if (!inserted) {
        form.setFieldValue("loading", false);
      } else {
        notifications.show({
          message: "Transaction added successfully!",
          color: "green",
        });
        form.setFieldValue("loading", false);
        setCryptoTransactions(() => [...inserted]);
        router.push("/crypto");
      }
    }
  };

  return (
    <Container w={400} m={0} fluid>
      <Title mb="sm">Sell Order</Title>
      <Stack spacing="xs">
        <Select
          label="Currency"
          placeholder="Pick one"
          searchable
          name="currency"
          data={cryptocurrencies}
          {...form.getInputProps("currency")}
        />
        <Input.Wrapper label="Quantity" {...form.getInputProps("quantity")}>
          <Input
            name="quantity"
            type="number"
            min={0}
            {...form.getInputProps("quantity")}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Order Value"
          {...form.getInputProps("orderValue")}
        >
          <Input
            name="orderValue"
            type="number"
            min={0}
            {...form.getInputProps("orderValue")}
          />
        </Input.Wrapper>
        <Checkbox
          label="Custom Date and Time"
          {...form.getInputProps("withCustomDate", { type: "checkbox" })}
        />
        {form.values.withCustomDate ? (
          <DateTimePicker
            label="Transaction Date and Time"
            placeholder="Now"
            {...form.getInputProps("timestamp")}
          />
        ) : (
          ""
        )}
        <Button disabled={form.values.loading} onClick={addTransaction}>
          Add Transaction
        </Button>
      </Stack>
    </Container>
  );
};
