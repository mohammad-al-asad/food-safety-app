import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  caption?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>

          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.actions}>
              <Pressable
                style={[styles.actionButton, styles.confirmButton]}
                onPress={onConfirm}
              >
                <Text style={[styles.actionText, styles.confirmText]}>
                  {confirmText}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.actionButton, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={[styles.actionText, styles.cancelText]}>
                  {cancelText}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(32, 33, 36, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    maxWidth: 360,
  },
  caption: {
    color: "#D1D5DB",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#E9ECEA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8FC65D",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  title: {
    textAlign: "center",
    color: "#2D3136",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "500",
  },
  actions: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#E9ECEA",
  },
  cancelButton: {
    backgroundColor: colors.primary,
  },
  actionText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  confirmText: {
    color: colors.primary,
  },
  cancelText: {
    color: colors.white,
  },
});
