// getVariantStyle.test.js

import { getBgVariantStyle, getTextVariantStyle } from "../utils";
import { theme } from "../../constants";

describe("getBgVariantStyle", () => {
  test("returns the correct style for primary variant", () => {
    expect(getBgVariantStyle("primary")).toBe(
      `bg-[${theme.colors.primary[500]}]`,
    );
  });

  test("returns the correct style for secondary variant", () => {
    expect(getBgVariantStyle("secondary")).toBe("bg-gray-500");
  });

  test("returns the correct style for danger variant", () => {
    expect(getBgVariantStyle("danger")).toBe("bg-red-500");
  });

  test("returns the correct style for success variant", () => {
    expect(getBgVariantStyle("success")).toBe("bg-green-500");
  });

  test("returns the correct style for outline variant", () => {
    expect(getBgVariantStyle("outline")).toBe(
      "bg-transparent border-neutral-300 border-[0.5px]",
    );
  });
});

describe("getTextVariantStyle", () => {
  test("returns the correct style for primary variant", () => {
    expect(getTextVariantStyle("primary")).toBe("text-black");
  });

  test("returns the correct style for secondary variant", () => {
    expect(getTextVariantStyle("secondary")).toBe("text-gray-100");
  });

  test("returns the correct style for danger variant", () => {
    expect(getTextVariantStyle("danger")).toBe("text-red-100");
  });

  test("returns the correct style for success variant", () => {
    expect(getTextVariantStyle("success")).toBe("text-green-100");
  });

  test("returns the correct style for default variant", () => {
    expect(getTextVariantStyle("default")).toBe(
      `bg-[${theme.colors.primary[500]}]`,
    );
  });
});
