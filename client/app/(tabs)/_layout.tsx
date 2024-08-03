import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Play",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "musical-notes" : "musical-notes-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Recording",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "stop-circle" : "stop-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "stop-circle" : "stop-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
