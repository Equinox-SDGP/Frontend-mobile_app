import { StyleSheet, Text } from "react-native";
import React from "react";
import { Card, View, Button } from "tamagui"; // or '@tamagui/card'
import { Bold, CircleDollarSign, Plus } from "@tamagui/lucide-icons";
import { Image } from "react-native";
import dollarIcon from "./../../assets/icons/dolarIcon.png";

const StatCard = ({ type, label, amount, icon }) => {
  return (
    <Card style={styles.card} backgroundColor="#fff">
      <Card.Header>
        <Image style={styles.tinyLogo} source={icon} />
      </Card.Header>
      <Card.Footer style={styles.footer}>
        <Text style={styles.price}>{amount}</Text>
        <Text style={styles.savemoney}>{label}</Text>
      </Card.Footer>
      <Card.Background />
    </Card>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 35,
    height: 35,
  },
  card: {
    //height: 115,
    width: 183,
    alignItems: "center",
    paddingBottom: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  savemoney: {
    fontSize: 12,
    fontWeight: "thin",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
