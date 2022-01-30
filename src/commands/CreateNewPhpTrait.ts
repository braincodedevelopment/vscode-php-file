import * as vscode from "vscode";
import { PhpInputManager } from "../php/input/PhpInputManager";
import { PhpFileManager } from "../php/io/PhpFileManager";
import { PhpParser as Parser } from "../php/PhpParser";

export async function run(
    configuration: vscode.WorkspaceConfiguration,
    url: vscode.Uri
) {
    let templates = configuration.get('templates.PHPTrait') as string[];

    let data = await PhpInputManager.inputToParseData("Trait", false, false);

    if (data !== undefined) {
        const content = Parser.createTemplate(data, templates);

        PhpFileManager.createFile(url.fsPath, data.getName(), content);
    }
}
