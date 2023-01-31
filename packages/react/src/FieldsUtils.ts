import { Field } from './Types';

/**
 * Returns a boolean indicating whether the passed field is a checkbox.
 *
 * @param {Field} field The field to check.
 * @returns {boolean} True if the field is a checkbox, false otherwise.
 */
export function isCheckbox(field: Field): boolean {
  return field.type === 'checkbox';
}

/**
 * Returns a boolean indicating whether the passed field is a radio button.
 *
 * @param {Field} field The field to check.
 * @returns {boolean} True if the field is a radio button, false otherwise.
 */
export function isRadio(field: Field): boolean {
  return !!field?.querySelector('input[type="radio"]');
}

/**
 * Extracts an array of radio elements within a given field.
 *
 * @param {Field} field The field to extract radio elements from.
 * @returns {Field[]} An array of radio elements.
 */
export function extractRadioElements(field: Field) {
  return Array.from<Field>(field.querySelectorAll('input[type="radio"]'));
}
