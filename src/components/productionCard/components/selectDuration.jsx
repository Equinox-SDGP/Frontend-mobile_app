import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";

export default function SelectDuration(props) {
  const [val, setVal] = useState(items[0].name.toLowerCase());
  function handleIntervalChange(value) {
    setVal(value);
    props.handleIntervalChange(value);
  }

  return (
    <Select
      value={val}
      onValueChange={handleIntervalChange}
      disablePreventBodyScroll
      {...props}>
      <Select.Trigger
        width={120}
        iconAfter={ChevronDown}
        style={styles.selectButton}>
        <Select.Value placeholder="Time Duration" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={100}>
          <Select.Group>
            <Select.Label>Time Duration</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>

          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none">
              <ChevronDown size={getFontSize(props.size ?? "$true")} />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
const items = [
  { name: "Day" },
  { name: "Week" },
  { name: "Month" },
  { name: "Year" },
];

const styles = {
  selectButton: {
    borderColor: "#DCDCDC",
    color: "#333",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: 800,
    textAlign: "left",
  },
};
