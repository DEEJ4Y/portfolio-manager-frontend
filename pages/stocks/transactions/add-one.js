import DashAppShell from "@/components/AppShell";
import { useState } from "react";
import { insertStockTransaction } from "@/services/stocks/local";
import stocks from "@/utils/stocks/stocks";
import {
  Button,
  Checkbox,
  Container,
  Group,
  Input,
  Select,
  Stack,
  Tabs,
  Title,
  Text,
  Center,
  Loader,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Minus, Plus, FileUpload, FileDiff } from "tabler-icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import papa from "papaparse";

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
          <Tabs.Tab value="upload" right={<FileUpload size={16} />}>
            Upload
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="buy">
          <BuyForm />
        </Tabs.Panel>
        <Tabs.Panel value="sell">
          <SellForm />
        </Tabs.Panel>
        <Tabs.Panel value="upload">
          <UploadForm />
        </Tabs.Panel>
      </Tabs>
    </DashAppShell>
  );
}

const BuyForm = () => {
  const router = useRouter();

  const [stockTransactions, setStockTransactions] = useLocalStorage({
    key: "transactions/stocks",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const form = useForm({
    initialValues: {
      symbol: null,
      quantity: 0,
      orderValue: 0,
      withCustomDate: false,
      timestamp: new Date(),
      loading: false,
      type: "BUY",
    },
    validate: {
      symbol: (value) =>
        value && value.length > 0 ? null : "Symbol is required.",
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

      const inserted = insertStockTransaction(form.values, stockTransactions);

      if (!inserted) {
        form.setFieldValue("loading", false);
      } else {
        notifications.show({
          message: "Transaction added successfully!",
          color: "green",
        });
        form.setFieldValue("loading", false);
        setStockTransactions(() => [...inserted]);
        router.push("/stocks");
      }
    }
  };

  return (
    <Container w={400} m={0} fluid>
      <Title mb="sm">Buy Order</Title>
      <Stack spacing="xs">
        <Select
          label="Symbol"
          placeholder="Pick one"
          searchable
          name="symbol"
          data={stocks}
          {...form.getInputProps("symbol")}
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

  const [stockTransactions, setStockTransactions] = useLocalStorage({
    key: "transactions/stocks",
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const form = useForm({
    initialValues: {
      symbol: null,
      quantity: 0,
      orderValue: 0,
      withCustomDate: false,
      timestamp: new Date(),
      loading: false,
      type: "SELL",
    },
    validate: {
      symbol: (value) =>
        value && value.length > 0 ? null : "symbol is required.",
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

      const inserted = insertCryptoTransaction(form.values, stockTransactions);

      if (!inserted) {
        form.setFieldValue("loading", false);
      } else {
        notifications.show({
          message: "Transaction added successfully!",
          color: "green",
        });
        form.setFieldValue("loading", false);
        setStockTransactions(() => [...inserted]);
        router.push("/crypto");
      }
    }
  };

  return (
    <Container w={400} m={0} fluid>
      <Title mb="sm">Sell Order</Title>
      <Stack spacing="xs">
        <Select
          label="Symbol"
          placeholder="Pick one"
          searchable
          name="symbol"
          data={stocks}
          {...form.getInputProps("symbol")}
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

const UploadForm = () => {
  const [_transactions, setStockTransactions] = useLocalStorage({
    key: "transactions/stocks",
    defaultValue: [],
    deserialize: JSON.parse,
  });
  const [uploaded, setUploaded] = useState(false);

  const parseFiles = (files) => {
    papa.parse(files[0], {
      complete: (data) => {
        setUploaded(true);

        let transactions = data.data;

        if (transactions) {
          transactions = transactions.filter((t) => t.symbol.length > 0);
          let final = [..._transactions];

          transactions.forEach((transaction) => {
            final = insertStockTransaction(
              {
                symbol: transaction.symbol,
                quantity: transaction.quantity,
                orderValue: transaction.price,
                timestamp: new Date(transaction.order_execution_time),
                type: transaction.trade_type.toUpperCase(),
              },
              final
            );
          });

          setStockTransactions(() => final);
          notifications.show({
            message: "Your transactions were saved successfully!",
            color: "green",
          });

          setUploaded(final);
        } else {
          notifications.show({
            message: "There was an error uploading your file.",
            color: "red",
          });
        }
      },
      header: true,
    });
  };

  if (typeof uploaded === "boolean" && uploaded)
    return (
      <Center>
        <Loader />
      </Center>
    );
  else if (uploaded) {
    return <div>{JSON.stringify(uploaded)}</div>;
  } else
    return (
      <div>
        <Dropzone
          style={{
            height: "calc(100vh - 5.75rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb="sm"
          accept={MIME_TYPES.csv}
          onDrop={parseFiles}
          maxFiles={1}
        >
          <Group>
            <FileDiff size={40} />
            <div>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Upload your single trade CSV file.
              </Text>
            </div>
          </Group>
        </Dropzone>
      </div>
    );
};
