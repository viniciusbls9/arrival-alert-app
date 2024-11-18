import { theme } from "@/src/constants";
import { ButtonProps } from "@/types";
import { getBgVariantStyle, getTextVariantStyle } from "@/src/utils/utils";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const Button = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "secondary",
  className,
}: ButtonProps) => (
  <TouchableOpacity
    testID="touchable-button"
    onPress={onPress}
    className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 bg-primary-500 ${className}`}
  >
    <Text className="text-lg font-bold text-white">
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
