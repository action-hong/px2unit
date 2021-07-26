import { cog } from './config';
import { Rule } from './interface';

export const RULES: Rule[] = [];

function cleanZero(val: number): string {
  if (cog.autoRemovePrefixZero) {
    if (val.toString().startsWith('0.')) {
      return val.toString().substring(1);
    }
  }
  return val + '';
}

export function resetRules(): void {
  RULES.length = 0;
  cog.transformRules.forEach((item, index) => {
    const type = item.title || `${item.sourceWidth} => ${item.destinationWidth} ${item.unit}`;
    RULES.push({
      index,
      all: /([-]?[\d.]+)px/g,
      single: /([-]?[\d.]+)p(x)?$/,
      fn: text => {
        const px = parseFloat(text);
        const resultValue = +(px * item.destinationWidth / item.sourceWidth).toFixed(cog.fixedDigits);
        const value = cleanZero(resultValue) + item.unit;
        const label = `${px}px -> ${value}`;
        return {
          type,
          text,
          px: `${px}px`,
          pxValue: px,
          to: value,
          toValue: resultValue,
          value,
          label,
          documentation: `convert ${px}px to ${value}`
        };
      },
      hover: /([-]?[\d.]+)px/,
      hoverFn: pxText => {
        const px = parseFloat(pxText);
        const resultValue = +(px * item.destinationWidth / item.sourceWidth).toFixed(cog.fixedDigits);
        const value = cleanZero(resultValue) + item.unit;
        return {
          type,
          documentation: `convert to ${value}`
        };
      }
    });
  });
}
