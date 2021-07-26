import { commands, ExtensionContext, languages, Position, Range, Selection, TextEditor, workspace } from 'vscode';
import CssRemProvider from './completion';
import { cog, isIngore, loadConfig } from './config';
import CssRemHoverProvider from './hover';
import { CssRemProcess } from './process';

let process: CssRemProcess;

export function activate(context: ExtensionContext) {
  loadConfig();
  workspace.onDidChangeConfiguration(() => loadConfig());

  process = new CssRemProcess();

  const LANS = [...cog.languages];

  for (const lan of LANS) {
    const providerDisposable = languages.registerCompletionItemProvider(lan, new CssRemProvider(lan, process));
    context.subscriptions.push(providerDisposable);
  }
  if (cog.hover !== 'disabled') {
    const hoverProvider = new CssRemHoverProvider();
    context.subscriptions.push(languages.registerHoverProvider(LANS, hoverProvider));
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  //
}
