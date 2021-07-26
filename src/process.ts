import { ConvertResult, Rule, RuleOPType } from './interface';
import { RULES } from './rules';

export class CssRemProcess {
  convert(text: string): ConvertResult[] | null {
    const res = this.getRule('single', text);
    if (res.length === 0) {
      return null;
    }

    return res.map(i => i.rule.fn(i.text));
  }

  private getRule(type: RuleOPType, text: string): { rule: Rule; text: string }[] {
    const result: { rule: Rule; text: string }[] = [];
    for (const rule of RULES) {
      const match = text.match(rule[type]);
      if (match) {
        result.push({ rule, text: match[1] });
      }
    }
    return result;
  }
}
