import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import {
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useEffect, useRef } from "react";

export default TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderColor: focused ? "white" : "transparent",
            },
          ]}>
          <Animatable.View ref={circleRef} style={styles.circle} backgroundColor={focused?"#FF621F":"white"}>
            <item.icon width={25} height={25} stroke={focused?"#FFFF":"#0000"}/>
          </Animatable.View>
        </View>
        <Animatable.Text ref={textRef} style={styles.text} >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.1, translateY: -10 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -10 },
  1: { scale: 1, translateY: 7 },
};
const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    borderColor: "white",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "black",
    marginTop: 2,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "white",
  },
});