import { FC } from "react";
import { ImageSourcePropType, StyleSheet, Image, View } from "react-native";

interface EmojiStickerProps {
  stickerSource: ImageSourcePropType;
  imageSize: number;
}

const EmojiSticker: FC<EmojiStickerProps> = ({ stickerSource, imageSize }) => {
  return (
    <View style={{ top: -250 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

export default EmojiSticker;

const styles = StyleSheet.create({});
