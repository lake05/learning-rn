import { FC, useMemo } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

interface EmojiListProps {
  onSelect: (emoji: ImageSourcePropType) => void;
  onCloseModal: () => void;
}

const EmojiList: FC<EmojiListProps> = ({ onSelect, onCloseModal }) => {
  const emojis = useMemo<ImageSourcePropType[]>(
    () => [
      require("../assets/images/emoji1.png"),
      require("../assets/images/emoji2.png"),
      require("../assets/images/emoji3.png"),
      require("../assets/images/emoji4.png"),
      require("../assets/images/emoji5.png"),
      require("../assets/images/emoji6.png"),
    ],
    []
  );

  const handlePress = (item: ImageSourcePropType) => {
    onSelect(item);
    onCloseModal();
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType;
    index: number;
  }) => (
    <Pressable onPress={() => handlePress(item)}>
      <Image source={item} key={index} style={styles.image} />
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      renderItem={renderItem}
    />
  );
};

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
