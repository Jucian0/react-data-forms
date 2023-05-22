export function isRadioOrCheckbox(element: any) {
  return element.type === "radio" || element.type === "checkbox";
}

export function isSelect(element: any) {
  return element.type === "select";
}

export function setOptionAsDefault(element: HTMLSelectElement, value: any) {
  const index = Array.from(element.options).findIndex(
    (option) => option.value === value
  );

  if (index !== -1) {
    element.options[index].defaultSelected = true;
  }
}
