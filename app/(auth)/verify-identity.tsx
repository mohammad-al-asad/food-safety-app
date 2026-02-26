import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NativeSyntheticEvent } from "react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";
import SquareIcon from "@/components/SquareIcon";

const OTP_LENGTH = 4;
const INITIAL_TIMER_SECONDS = 45;

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIMER_SECONDS);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const bootstrapFocus = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(bootstrapFocus);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (rawValue: string, index: number) => {
    const cleaned = rawValue.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...code];
      next[index] = "";
      setCode(next);
      return;
    }

    const next = [...code];
    if (cleaned.length > 1) {
      cleaned
        .slice(0, OTP_LENGTH)
        .split("")
        .forEach((digit, offset) => {
          const position = index + offset;
          if (position < OTP_LENGTH) {
            next[position] = digit;
          }
        });
      setCode(next);
      const nextFocus = Math.min(index + cleaned.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    next[index] = cleaned;
    setCode(next);
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key !== "Backspace") {
      return;
    }

    if (code[index]) {
      const next = [...code];
      next[index] = "";
      setCode(next);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpComplete = code.every((digit) => digit.length === 1);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const handleResend = () => {
    if (secondsLeft > 0) {
      return;
    }
    setCode(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(INITIAL_TIMER_SECONDS);
    setFocusedIndex(0);
    inputRefs.current[0]?.focus();
  };

  const handleConfirm = () => {
    if (!otpComplete) {
      return;
    }
    router.push("/reset-password");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <SquareIcon>
          <Ionicons name="shield-checkmark" size={30} color={colors.primary} />
        </SquareIcon>
        <Text style={styles.heading}>Verify Identity</Text>
        <Text style={styles.subHeading}>
          Enter the 4-digit code sent to your email
        </Text>

        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputRefs.current[idx] = ref;
              }}
              style={[
                styles.codeInput,
                (focusedIndex === idx || digit) && styles.codeInputActive,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              placeholder="-"
              caretHidden
              contextMenuHidden
              placeholderTextColor={colors.textPrimary}
              onChangeText={(value) => handleChange(value, idx)}
              onFocus={() => setFocusedIndex(idx)}
              onKeyPress={(event) => handleKeyPress(event, idx)}
              textAlign="center"
            />
          ))}
        </View>
        <Pressable
          onPress={handleResend}
          disabled={secondsLeft > 0}
          hitSlop={8}
        >
          <Text style={styles.resend}>
            <Ionicons name="time-outline" size={13} color={colors.textMuted} />{" "}
            {secondsLeft > 0 ? "Resend code in " : "Resend code "}
            <Text
              style={[styles.timer, secondsLeft === 0 && styles.timerActive]}
            >
              {secondsLeft > 0 ? formattedTime : ""}
            </Text>
          </Text>
        </Pressable>

        <View style={styles.spacer} />
        <CustomButton
          title="Confirm"
          onPress={handleConfirm}
          disabled={!otpComplete}
        />
        <Pressable onPress={() => router.replace("/forgot-password")}>
          <Text style={styles.smallText}>I didn&apos;t receive a code</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 26,
  },
  heading: {
    marginTop: 18,
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 12,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
  },
  codeRow: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  codeInput: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "transparent",
    backgroundColor: colors.inputBackground,
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "700",
  },
  codeInputActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  resend: {
    marginTop: 14,
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 14,
  },
  timer: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
  timerActive: {
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  smallText: {
    marginTop: 12,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
  },
});
