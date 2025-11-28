import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import QuestsScreen from "../screens/QuestsScreen";
import GlobalScreen from "../screens/GlobalScreen";
import SquadScreen from "../screens/SquadScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type MainTabsParamList = {
  Home: undefined;
  Quests: undefined;
  Global: undefined;
  Squads: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00E28A",
        tabBarInactiveTintColor: "#7E8AA8",
        tabBarStyle: {
          backgroundColor: "#050B18",
          borderTopColor: "#10152A",
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Herói" }}
      />
      <Tab.Screen
        name="Quests"
        component={QuestsScreen}
        options={{ title: "Missões" }}
      />
      <Tab.Screen
        name="Global"
        component={GlobalScreen}
        options={{ title: "Global" }}
      />
      <Tab.Screen
        name="Squads"
        component={SquadScreen}
        options={{ title: "Squads" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
