import { Field } from './Types';

export function isCheckbox(field: Field): boolean {
  return field.type === 'checkbox';
}

export function isRadio(field: Field): boolean {
  return !!field?.querySelector('input[type="radio"]');
}

export function extractRadioElements(field: Field) {
  return Array.from<Field>(field.querySelectorAll('input[type="radio"]'));
}
