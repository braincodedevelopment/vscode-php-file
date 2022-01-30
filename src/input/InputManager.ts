import { window, InputBoxOptions } from "vscode";
import { PhpNamespaceInputBoxOptions } from "./options/PhpNamespaceInputBoxOptions";

export class InputManager {
    public static async input(options: InputBoxOptions) {
        let value = await window.showInputBox(options);

        if (value !== undefined) {
            value = value.trim();
        }

        return value;
    }

    public static async requiredInput(options: InputBoxOptions) {
        const value = await this.input(options);

        if (value !== undefined && !value) {
            window.showErrorMessage(options.prompt + " is required!");

            return undefined;
        }

        return value;
    }

    public static createOption(prompt: string, validate: boolean = true): InputBoxOptions {
        if (validate) {
            return new PhpNamespaceInputBoxOptions(prompt);
        } else {
            return { "prompt": prompt } as InputBoxOptions;
        }
    }
}
