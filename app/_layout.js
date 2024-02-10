import { TamaguiProvider } from "tamagui";
import { Tabs } from "expo-router";
import tamaguiConfig from "../tamagui.config";
import { Home, MessageSquare, UserRound } from "@tamagui/lucide-icons";

export default function Applayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Tabs>
        <Tabs.Screen
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            href: "/",
          }}
          icon={Home}
        />
        <Tabs.Screen
          name="Chatbot"
          options={{
            href: "/chatbot",
          }}
          icon={MessageSquare}
        />
        <Tabs.Screen
          name="devices"
          options={{
            href: "/devices",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: "/profile",
          }}
          icon={UserRound}
        />
      </Tabs>
    </TamaguiProvider>
  );
}
