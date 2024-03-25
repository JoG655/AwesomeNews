export function addAttribute<T extends HTMLElement>(
  element: T,
  name: string,
  value: string,
) {
  if (!name?.length) return;

  if (!value?.length) return;

  const currentValue = element.getAttribute(name);

  if (!currentValue?.length) {
    element.setAttribute(name, value);

    return;
  }

  const currentValues = currentValue.split(" ");

  const newValues = value.split(" ").filter((value) => {
    return currentValues.indexOf(value) < 0;
  });

  if (!newValues.length) return;

  element.setAttribute(name, [...currentValues, ...newValues].join(" "));

  return;
}
