import { addAttribute } from "@/utils/attribute-manipulation/addAttribute";
import { removeAttribute } from "@/utils/attribute-manipulation/removeAttribute";
import { getRandomID } from "@/utils/attribute-manipulation/getRandomID";

function handleDisableFocus(
  element: HTMLElement,
  disableFocusOriginTarget: string,
  abort: boolean,
) {
  const disableFocus = element.getAttribute("data-disable-focus");

  if (abort) {
    removeAttribute(
      element,
      "data-disable-focus-origin-label",
      disableFocusOriginTarget,
    );

    const disableFocusOriginLabel = element.getAttribute(
      "data-disable-focus-origin-label",
    );

    if (disableFocus?.length && !disableFocusOriginLabel?.length) {
      if (disableFocus === "JoG-Blank") {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", disableFocus);
      }

      element.removeAttribute("data-disable-focus");
    }

    return;
  }

  addAttribute(
    element,
    "data-disable-focus-origin-label",
    disableFocusOriginTarget,
  );

  if (!disableFocus?.length) {
    const tabIndex = element.getAttribute("tabindex");

    if (!tabIndex?.length) {
      element.setAttribute("data-disable-focus", "JoG-Blank");
    } else {
      element.setAttribute("data-disable-focus", tabIndex);
    }

    element.setAttribute("tabindex", "-1");
  }

  return;
}

export const disableFocus = {
  enable<T extends HTMLElement>(container: T) {
    const disableFocusOriginTarget = container.getAttribute(
      "data-disable-focus-origin-target",
    );

    if (disableFocusOriginTarget?.length) return;

    if (document.activeElement && container.contains(document.activeElement)) {
      try {
        (document.activeElement as HTMLElement).blur();
      } catch {}
    }

    const id = container.getAttribute("id");

    const generatedDisableFocusOriginTarget = id?.length ? id : getRandomID();

    container.setAttribute(
      "data-disable-focus-origin-target",
      generatedDisableFocusOriginTarget,
    );

    let focusableQuery =
      "a[href], area[href], input, select, button, textarea, iframe, object, embed, *[tabindex], *[contenteditable]";

    const focusableElements =
      container.querySelectorAll<HTMLElement>(focusableQuery);

    focusableElements.forEach((focusableElement) => {
      handleDisableFocus(
        focusableElement,
        generatedDisableFocusOriginTarget,
        false,
      );
    });
  },
  disable<T extends HTMLElement>(container: T) {
    const disableFocusOriginTarget = container.getAttribute(
      "data-disable-focus-origin-target",
    );

    if (!disableFocusOriginTarget?.length) return;

    container.removeAttribute("data-disable-focus-origin-target");

    const disabledFocusQuery =
      "[data-disable-focus-origin-label~=" + disableFocusOriginTarget + "]";

    const disabledFocusElements =
      container.querySelectorAll<HTMLElement>(disabledFocusQuery);

    disabledFocusElements.forEach((disabledFocusElement) => {
      handleDisableFocus(disabledFocusElement, disableFocusOriginTarget, true);
    });
  },
};
