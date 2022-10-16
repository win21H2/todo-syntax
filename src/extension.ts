import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	var DEFAULT_TAGS = {
    	// eslint-disable-next-line @typescript-eslint/naming-convention
		"TODO:": {
			text: "TODO:",
			color: '#d8572a',
			overviewRulerColor: 'rgba(216,87,42,0.8)'
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"FIXME:": {
			text: "FIXME:",
			color: '#f7b538',
			overviewRulerColor: 'rgba(247,181,56,0.8)'
		}
	};

	function clearNotifications() {
		setTimeout(() => {
			vscode.commands.executeCommand('notifications.clearAll');
		}, 5000);
	}

	let ENABLE_EXTENSION = vscode.commands.registerCommand('todo-syntax.enableExtension', () => {
		vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Enabling TODO syntax...", cancellable: true}, () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
		}).then(() => {
			vscode.window.showInformationMessage('Extension enabled!');
			clearNotifications();
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
			vscode.window.showInformationMessage('Feature not functional yet!');
			clearNotifications();
		});
	});

	let LOCATE_TODOS = vscode.commands.registerCommand('todo-syntax.locateTodos', () => {

		let text = vscode.window.activeTextEditor.document.getText();

		function locateTodos(str: string) {
			let linesInDoc = str.split(/\r?\n/);

			for (let i = 0; i < linesInDoc.length; i++) {
				if (linesInDoc[i].includes("TODO")) {
					var todoTextWithComment = linesInDoc[i];
					var todoTextWithoutComment = todoTextWithComment.replace("//", "");
					var todoLineNumber = i + 1;

					vscode.window.showInformationMessage(todoTextWithoutComment + " <- on line -> " + todoLineNumber);

					const uri = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.fsPath + '/todo-syntax.js');

					
					vscode.window.activeTextEditor.setDecorations(
						vscode.window.createTextEditorDecorationType({
							color: DEFAULT_TAGS["TODO:"].color,
							overviewRulerColor: DEFAULT_TAGS["TODO:"].overviewRulerColor
						}),
						[new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, linesInDoc.length))]
					);
				}
			}
		}

		vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Getting word and TODO count...", cancellable: true}, () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});
		}).then(() => {
			vscode.window.showInformationMessage("" + locateTodos(text));
			
			// setTimeout(() => {
			// 	vscode.commands.executeCommand('notifications.clearAll');
			// }, 5000);
		});
	});

	// function locateTodos(str: string) {
	// 	let todoFile = vscode.window.activeTextEditor.document.fileName;
	// 	const uri = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.fsPath + '/todo-syntax.js');

	// 	if(vscode.window.activeTextEditor === undefined || vscode.window.activeTextEditor.document === undefined){
	// 		vscode.window.showErrorMessage('NO FILE OPEN');
	// 		return;
	// 	}
	// 	let lines = str.split(/\r?\n/);
	// 	for (let i = 0; i < lines.length; i++) {
	// 		if (lines[i].includes("TODO")) {
	// 			//FILE CREATION AND APPLICATION


	// 			vscode.workspace.fs.writeFile(uri, Buffer.from("//" + todoFile + '\n' + lines[i] + '\n'));

	// 			//DECORATION
	// 			vscode.window.activeTextEditor.setDecorations(
	// 				vscode.window.createTextEditorDecorationType({
	// 					color: DEFAULT_TAGS["TODO:"].color,
	// 					overviewRulerColor: DEFAULT_TAGS["TODO:"].overviewRulerColor
	// 				}),
	// 				[new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, lines.length))]
	// 			);
	// 		}
	// 	}
	// }

	// setInterval(() => {
	// 	locateTodos(vscode.window.activeTextEditor?.document.getText() || "");
	// }, 1000);

	context.subscriptions.push(ENABLE_EXTENSION, DISABLE_EXTENSION, LOCATE_TODOS);
}

export function deactivate() {}