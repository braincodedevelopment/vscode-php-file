import * as vscode from "vscode";
import * as CreateNewPhpClass from "./commands/CreateNewPhpClass";
import * as CreateNewPhpInterface from "./commands/CreateNewPhpInterface";
import * as CreateNewPhpTrait from "./commands/CreateNewPhpTrait";

import { createCommand as command } from "./helper";

export function activate(context: vscode.ExtensionContext) {
	let configuration = vscode.workspace.getConfiguration('php-file');
	
	context.subscriptions.push(
		command('php-file.createNewPhpClass', CreateNewPhpClass.run.bind(undefined, configuration)),
		command('php-file.createNewPhpInterface', CreateNewPhpInterface.run.bind(undefined, configuration)),
		command('php-file.createNewPhpTrait', CreateNewPhpTrait.run.bind(undefined, configuration))
	);
}

export function deactivate() {}
