import { InputBoxOptions } from "vscode";
import { PhpUtils } from "../../php/PhpUtils";

export class PhpNamespaceInputBoxOptions implements InputBoxOptions {
    private static get namespaceInvalidMessage() { return "Namespace is invalid!"; };

    public prompt: string;
    
    public constructor(prompt: string) {
        this.prompt = prompt;
    }

    public validateInput(text: string): string | undefined {
        if (!PhpUtils.isNamespaceValid(text)) {
            return PhpNamespaceInputBoxOptions.namespaceInvalidMessage;
        }

        return undefined;
    }
}
