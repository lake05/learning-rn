import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageSourcePropType, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceholderImage = require("./assets/images/background-image.png");

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import { useRef, useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import domtoimage from "dom-to-image";

export default function App() {
  const imageRef = useRef<View | HTMLCanvasElement>(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(
    null
  );
  const [isModelVisible, setIsModelVisible] = useState(false);

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModelVisible(true);
  };

  const onModelClose = () => {
    setIsModelVisible(false);
  };

  const onEmojiSelect = (emoji: ImageSourcePropType) => {
    setPickedEmoji(emoji);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const dataUrl = await domtoimage.toJpeg(
        imageRef.current as HTMLCanvasElement,
        {
          quality: 0.92,
          width: 320,
          height: 440,
        }
      );

      let link = document.createElement("a");
      link.download = "sticker-smash.jpeg";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <EmojiPicker isVisible={isModelVisible} onClose={onModelClose}>
        <EmojiList onSelect={onEmojiSelect} onCloseModal={onModelClose} />
      </EmojiPicker>

      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
