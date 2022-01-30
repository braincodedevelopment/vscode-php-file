import * as vscode from 'vscode';

export function createCommand(command: string, callback: any): vscode.Disposable {
	return vscode.commands.registerCommand(command, callback);
}

export function isString(value: any) {
	return value !== undefined && typeof value === 'string';
}
