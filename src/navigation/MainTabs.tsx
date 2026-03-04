import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import QuestsScreen from "../screens/QuestsScreen";
import GlobalScreen from "../screens/GlobalScreen";
import SquadScreen from "../screens/SquadScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { THEME } from "../constants/Theme";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

export type MainTabsParamList = {
  Home: undefined;
  Quests: undefined;
  Global: undefined;
  Squads: undefined;
  Profile: undefined;
};

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: THEME.accent,
            tabBarInactiveTintColor: THEME.textSecondary,
            tabBarStyle: {
              backgroundColor: THEME.background,
              borderTopColor: THEME.border,
              height: 65,
              paddingBottom: 10,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '800',
              marginTop: -5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName: any;
              if (route.name === 'Home') iconName = 'speedometer';
              else if (route.name === 'Quests') iconName = 'clipboard-check-outline';
              else if (route.name === 'Global') iconName = 'earth';
              else if (route.name === 'Squads') iconName = 'account-group-outline';
              else if (route.name === 'Profile') iconName = 'account-circle-outline';
              return <MaterialCommunityIcons name={iconName} size={28} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "HERÓI" }}
          />
          <Tab.Screen
            name="Quests"
            component={QuestsScreen}
            options={{ title: "PIT-STOP" }}
          />
          <Tab.Screen
            name="Global"
            component={GlobalScreen}
            options={{ title: "MUNDO" }}
          />
          <Tab.Screen
            name="Squads"
            component={SquadScreen}
            options={{ title: "SQUADS" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "PERFIL" }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: THEME.background,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: CONTENT_WIDTH,
  }
});
