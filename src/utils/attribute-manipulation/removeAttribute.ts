export function removeAttribute<T extends HTMLElement>(
  element: T,
  name: string,
  value: string,
) {
  if (!name?.length) return;

  if (!value?.length) return;

  const currentValue = element.getAttribute(name);

  if (currentValue == null) return;

  if (!currentValue.length) {
    element.removeAttribute(name);

    return;
  }

  const values = value.split(" ");

  const newValues = currentValue.split(" ").filter((currentValue) => {
    return values.indexOf(currentValue) < 0;
  });

  if (!newValues.length) {
    element.removeAttribute(name);

    return;
  }

  element.setAttribute(name, newValues.join(" "));

  return;
}
