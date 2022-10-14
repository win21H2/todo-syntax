// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('todo-syntax.helloWorld', () => {
		
		vscode.window.showInformationMessage('Hello World from TODO syntax!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}