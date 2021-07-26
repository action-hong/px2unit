import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Uri, workspace } from 'vscode';
import { Config } from './interface';
import { resetRules } from './rules';

export let cog: Config;

const defaultOption = {
  fixedDigits: 2,
  autoRemovePrefixZero: true,
  addMark: false,
  hover: 'onlyMark'
};

function fixIngores(): void {
  if (!Array.isArray(cog.ingores)) {cog.ingores = [];}
  if (!workspace.workspaceFolders) {return;}
  if (workspace.workspaceFolders.length === 0) {
    return;
  }
  const rootPath = workspace.workspaceFolders[0].uri.path;
  cog.ingores = cog.ingores.map(p => join(rootPath, p));
}

function fixLanguages(): void {
  if (!Array.isArray(cog.languages)) {cog.languages = [];}
  if (cog.languages.length > 0) {return;}
  cog.languages = ['html', 'vue', 'css', 'postcss', 'less', 'scss', 'sass', 'stylus', 'javascriptreact', 'typescriptreact'];
}

function fixTransofrmRules(): void {
  if (!Array.isArray(cog.transformRules)) {
    cog.transformRules = [];
  }
  if (cog.transformRules.length > 0) {return;}
  cog.transformRules = [
    {
      sourceWidth: 375,
      destinationWidth: 10,
      unit: 'rem'
    },
    {
      sourceWidth: 375,
      destinationWidth: 100,
      unit: 'vw'
    },
    {
      sourceWidth: 375,
      destinationWidth: 750,
      unit: 'rpx'
    }
  ];
}

export function loadConfig(): void {
  cog = { 
    ...defaultOption,
    ...(workspace.getConfiguration('px2unit') as any) };
  console.log('==> config', cog);
  fixTransofrmRules();
  fixIngores();
  fixLanguages();
  resetRules();
  console.log('current config', cog);
}

export function isIngore(uri: Uri) {
  return cog.ingores.some(p => uri.path.startsWith(p));
}
