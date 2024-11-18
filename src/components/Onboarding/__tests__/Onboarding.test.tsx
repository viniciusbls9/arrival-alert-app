import { render } from "@testing-library/react-native";

import Onboarding from "..";
import { onboarding } from "@/src/constants";

describe("Onboarding component", () => {
  test("should render onboarding component with correctly values", () => {
    const { getByText } = render(<Onboarding onboarding={onboarding} />);

    getByText("Escolha seu destino e o contato");
    getByText(
      "Digite seu ponto de partida, destino e adicione o contato que quer notificar.",
    );
  });
});
