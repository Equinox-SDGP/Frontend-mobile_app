import { StyleSheet, Text } from "react-native";
import React from "react";
import { Card, View, Button } from "tamagui"; // or '@tamagui/card'
import { Bold, CircleDollarSign, Plus } from "@tamagui/lucide-icons";
import { Image } from "react-native";
import dollarIcon from "./../../assets/icons/dolarIcon.png"

const StatCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Header>
      <Image
        style={styles.tinyLogo}
        source={dollarIcon}
        
      />
      </Card.Header>
      <Card.Footer >
        <Text style={styles.price}>+Rs.5000</Text>

      </Card.Footer >

      {/* any other components */}

      <Card.Background />
    </Card>
  );
};

export default StatCard;

const styles = StyleSheet.create({
    tinyLogo:{
        width: 20,
        height: 20,
    },
    card:{
        height:115,
        width:183,
        alignItems:"center",
    },
    price:{
        fontSize:22,
        fontWeight:"bold"
    }
});
