import { theme } from "@/src/constants";
import { OnboardingProps } from "@/types";
import { View, Image, Text } from "react-native";

const Onboarding = ({ onboarding }: OnboardingProps) =>
  onboarding.map((item) => (
    <View
      key={item.description}
      className="flex items-center justify-center p-5"
    >
      <Image
        source={item.image}
        className="w-full h-[100px]"
        resizeMode="contain"
      />
      <View className="flex flex-row items-center justify-center w-full mt-10">
        <Text className="text-black text-3xl font-bold mx-10 text-center">
          {item.title}
        </Text>
      </View>

      <Text
        className={`text-lg font-JakartaSemiBold text-center text-[${theme.colors.general[500]}] mx-10 mt-3`}
      >
        {item.description}
      </Text>
    </View>
  ));

export default Onboarding;
