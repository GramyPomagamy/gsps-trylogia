'use strict';

/**
 * Formats an amount as USD, cents optional.
 * @param {Number} amount - The amount to format.
 * @returns {string} - The formatted string.
 */
export function formatMoney(amount: number): string {
  return (
    parseFloat(amount.toString()).toLocaleString('en-US', {
      maximumFractionDigits: 0,
    }) + ' PLN'
  );
}