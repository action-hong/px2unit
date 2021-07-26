export interface Config {
  /** Px to rem decimal point maximum length, default: 6 */
  fixedDigits: number;
  /** Automatically remove prefix 0, default: true */
  autoRemovePrefixZero: boolean;
  /**
   * Whether to enabled mark, default: false
   */
  addMark: boolean;
  /**
   * Whether to enable display conversion data on hover, Default: onlyMark
   */
  hover: 'disabled' | 'always' | 'onlyMark';
  /**
   * 忽略清单
   */
  ingores: string[];
  /**
   * 支持语言清单
   */
  languages: string[];

  /**
   * 转化规则
   */
  transformRules: TransformRules[]
}

interface TransformRules {
  title?: string;
  sourceWidth: number;
  destinationWidth: number;
  unit: string;
}

export interface Rule {
  index: number;
  single: RegExp;
  all: RegExp;
  fn: (text: string) => ConvertResult;
  hover?: RegExp;
  hoverFn?: (text: string) => HoverResult;
}

export type RuleOPType = 'single' | 'all';

export interface ConvertResult {
  type: string;
  text: string;
  px?: string;
  pxValue?: number | string;
  rem?: string;
  remValue?: number | string;
  rpx?: string;
  rpxValue?: number | string;
  label: string;
  value: string;
  documentation?: string;
}

export interface HoverResult {
  type: string;
  documentation: string;
}
