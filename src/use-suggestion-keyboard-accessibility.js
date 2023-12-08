import { useEffect } from "react";

const getInputByLabelText = (labelText) =>
  Array.from(document.getElementsByTagName("input")).find((inputElement) =>
    Array.from(inputElement.labels).some(
      (label) => label.textContent === labelText
    )
  );

/**
 * This hook has nothing to do with the requirements and isn't even called in the tests.
 * Reading it is likely a waste of time.
 */
export const useSuggestionKeyboardAccessibility = () =>
  useEffect(() => {
    const handleKeydown = (event) => {
      const { activeElement } = document;
      const input = getInputByLabelText("Search for an option");
      const suggestions = Array.from(
        document.getElementsByClassName("autocomplete-item")
      );
      const focusableElements = [input, ...suggestions].filter(
        (element) => element != null
      );
      if (!focusableElements.includes(activeElement)) return;
      let nextIndex;
      switch (event.key) {
        case "ArrowDown":
          nextIndex =
            (focusableElements.indexOf(activeElement) + 1) %
            focusableElements.length;
          break;
        case "ArrowUp":
          nextIndex =
            (focusableElements.indexOf(activeElement) -
              1 +
              focusableElements.length) %
            focusableElements.length;
          break;
        case "Enter":
          activeElement.click();
          return;
        case "Shift":
        case "CapsLock":
        case "Control":
        case "Alt":
        case "Meta":
        case "Tab":
          return;
        default:
          input?.focus();
          return;
      }
      if (focusableElements[nextIndex] === input) {
        focusableElements[nextIndex].focus();
      } else {
        focusableElements[nextIndex].tabIndex = 0;
        focusableElements[nextIndex].focus();
        const handleBlur = (blurEvent) => {
          blurEvent.currentTarget.tabIndex = -1;
          blurEvent.currentTarget.removeEventListener("blur", handleBlur);
        };
        focusableElements[nextIndex].addEventListener("blur", handleBlur);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
