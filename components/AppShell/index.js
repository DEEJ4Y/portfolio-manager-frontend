import {
  AppShell,
  Container,
  Group,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Cash,
  ChartLine,
  CurrencyBitcoin,
  UserCircle,
  DeviceDesktopAnalytics,
  Home2,
  TargetArrow,
  Users,
  Logout,
} from "tabler-icons-react";

const DashNavbarItem = ({ title, Icon, href, style }) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const active = router.pathname === href;
  // if (Name === "Account") return;
  return (
    <Link href={href || "/"} style={{ textDecoration: "none", ...style }}>
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
  const [userDetailsData, setUserDetailsData] = useLocalStorage({
    key: "userDetails",
    defaultValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  return (
    <Navbar style={{ height: "100vh" }} width={{ base: 300 }} p="xs">
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
      <DashNavbarItem
        style={{ marginBottom: "0px", marginTop: "auto" }}
        title={userDetailsData?.name}
        Icon={UserCircle}
        href="/logout"
      />
      <DashNavbarItem
        style={{ marginBottom: "0px", marginTop: "0px" }}
        title={"Logout"}
        Icon={Logout}
        href="/logout"
      />
    </Navbar>
  );
};

export default function DashAppShell({ children }) {
  return <AppShell navbar={<DashNavbar />}>{children}</AppShell>;
}
