import {
  AppShell,
  Container,
  Group,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Cash,
  ChartLine,
  CurrencyBitcoin,
  DeviceDesktopAnalytics,
  Home2,
  TargetArrow,
  Users,
} from "tabler-icons-react";

const DashNavbarItem = ({ title, Icon, href }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const active = router.pathname === href;

  return (
    <Link href={href || "/"} style={{ textDecoration: "none" }}>
      <Container
        m={0}
        p="md"
        fluid
        bg={active ? theme.colors[theme.primaryColor][6] : ""}
        style={{ borderRadius: `4px` }}
      >
        <Group m={0}>
          <Icon size={24} color="#efefef" />
          <Text
            style={{
              color: active ? "#efefef" : "#efefef",
            }}
          >
            {title}
          </Text>
        </Group>
      </Container>
    </Link>
  );
};

const DashNavbar = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <DashNavbarItem
        title="Home"
        href="/dashboard"
        Icon={DeviceDesktopAnalytics}
      />
      <DashNavbarItem
        title="Cryptocurrency"
        href="/crypto"
        Icon={CurrencyBitcoin}
      />
      <DashNavbarItem title="Stocks" href="/stocks" Icon={ChartLine} />
      <DashNavbarItem title="Mutual Funds" href="/mutual-funds" Icon={Users} />
      <DashNavbarItem
        title="Fixed Deposits"
        href="/fixed-deposits"
        Icon={Cash}
      />
      <DashNavbarItem title="Real Estate" href="/real-estate" Icon={Home2} />
      <DashNavbarItem title="Goals" href="/goals" Icon={TargetArrow} />
    </Navbar>
  );
};

export default function DashAppShell({ children }) {
  return <AppShell navbar={<DashNavbar />}>{children}</AppShell>;
}
