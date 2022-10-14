// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

// var SYNTAX_COLORS = {
// 	// eslint-disable-next-line @typescript-eslint/naming-convention
// 	"TODO": {
// 		text: "TODO",
// 		color: "red"
// 	}
// }; 

export function activate(context: vscode.ExtensionContext) {
	
	let ENABLE_EXTENSION = vscode.commands.registerCommand('todo-syntax.enableExtension', () => {
		vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Enabling TODO syntax...", cancellable: true}, () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
		}).then(() => {
			vscode.window.showInformationMessage('Nothing here yet! Come back later.');
		});
	});

	let DISABLE_EXTENSION = vscode.commands.registerCommand('todo-syntax.disableExtension', () => {
		vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Disabling TODO syntax...", cancellable: true}, () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
		}).then(() => {
			vscode.window.showInformationMessage('Nothing here yet! Come back later.');
		});
	});

	let WORD_COUNTER = vscode.commands.registerCommand('todo-syntax.wordCounter', () => {
		if(vscode.window.activeTextEditor === undefined || vscode.window.activeTextEditor.document === undefined){
			return;
		}

		let text = vscode.window.activeTextEditor.document.getText();
			
		function countWords(str: string) {
			return str.trim().split(/\s+/).length;
		}

		function countTodo(str: string) {
			// if there is a TODO, change the color of the word to red
			
			return str.match(/TODO/g)?.length;	
		}

		vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Getting word and TODO count...", cancellable: true}, () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});
		}).then(() => {
			vscode.window.showInformationMessage('Word Count: ' + countWords(text));
			vscode.window.showInformationMessage('TODO Count: ' + countTodo(text));
		});
	});

	context.subscriptions.push(ENABLE_EXTENSION, DISABLE_EXTENSION, WORD_COUNTER);
}

export function deactivate() {}

/*

*/

/*
!SAMPLE BUTTON CODE
let button = "OK";
vscode.window.showInformationMessage('INFORMATION', button).then(selection => {
	if (selection === button) {
		// things to do when the button is clicked
	}
});

!SAMPLE TIMER PROGRESS BAR CODE
vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Opening extension source code...", cancellable: true}, () => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});
}).then(() => {
	vscode.env.openExternal(vscode.Uri.parse('https://github.com/win21H2/docs-list'));
});
*/