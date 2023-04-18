import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";

export default function LoginPage() {
  const router = useRouter();
  const [userDetailsData, setUserDetailsData] = useLocalStorage({
    key: "userDetails",
    defaultValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  useEffect(() => {
    setUserDetailsData(null);
    router.push("/login");
  });
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Logging Out...</h1>
    </div>
  );
}
