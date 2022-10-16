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

	let LOCATE_TODO = vscode.commands.registerCommand('todo-syntax.wordCounter', () => {
		if(vscode.window.activeTextEditor === undefined || vscode.window.activeTextEditor.document === undefined){
			vscode.window.showErrorMessage('ERROR NO_FILE_OPEN');
			return;
		}

		let text = vscode.window.activeTextEditor.document.getText();

		function countTodo(str: string) {
			return str.match(/TODO/g)?.length;	
		}

		function locateTodos(str: string) {
			let lines = str.split(/\r?\n/);

			for (let i = 0; i < lines.length; i++) {
				if (lines[i].includes("TODO")) {
					var todoText = lines[i];
					var todoTextNEW = todoText.replace("//", "");
					var todoLine = i + 1;

					vscode.window.showInformationMessage(todoTextNEW + " <- on line -> " + todoLine);
					
					vscode.window.activeTextEditor.setDecorations(
						vscode.window.createTextEditorDecorationType({
							color: DEFAULT_TAGS["TODO:"].color,
							overviewRulerColor: DEFAULT_TAGS["TODO:"].overviewRulerColor
						}),
						[new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, lines.length))]
					);
				}
				if (lines[i].includes("FIXME")) {
					var todoText = lines[i];
					var todoTextNEW = todoText.replace("//", "");
					var todoLine = i + 1;

					vscode.window.showInformationMessage(todoTextNEW + " <- on line -> " + todoLine);
					
					vscode.window.activeTextEditor.setDecorations(
						vscode.window.createTextEditorDecorationType({
							color: DEFAULT_TAGS["FIXME:"].color,
							overviewRulerColor: DEFAULT_TAGS["FIXME:"].overviewRulerColor
						}),
						[new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, lines.length))]
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
			vscode.window.showInformationMessage('TODO Total Count: ' + countTodo(text));
			vscode.window.showInformationMessage('TODO Word Count: ' + locateTodos(text));

			setTimeout(() => {
				vscode.commands.executeCommand('notifications.clearAll');
			}, 5000);
		});
	});

	context.subscriptions.push(ENABLE_EXTENSION, DISABLE_EXTENSION, LOCATE_TODO);
}

export function deactivate() {}

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