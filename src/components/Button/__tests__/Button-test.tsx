import { act, render, userEvent } from "@testing-library/react-native";

import Button from "@/src/components/Button";

describe("Button component", () => {
  const onPressMock = jest.fn();
  const buttonProps = {
    onPress: onPressMock,
    title: "Button title",
    bgVariant: "primary" as const,
    textVariant: "secondary" as const,
    className: "className",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Button renders correctly", () => {
    const { getByText } = render(<Button {...buttonProps} />);

    getByText("Button title");
  });

  test("calls onPress when pressed", async () => {
    const { getByText } = render(<Button {...buttonProps} />);
    const buttonText = getByText("Button title");

    await act(async () => {
      await userEvent.press(buttonText);
      expect(onPressMock).toHaveBeenCalled();
    });
  });

  test("applies the correct text variant style", async () => {
    const { getByText } = render(
      <Button {...buttonProps} bgVariant="success" />,
    );

    const buttonText = getByText("Button title");

    expect(buttonText.props.className).toContain("text-gray-100");
  });
});
