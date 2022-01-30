import { ParseData } from "./ParseData";
import { PhpUtils } from "./PhpUtils";

export class PhpParser {
    private static get nameParentheses(): string { return "{name}"; }
    private static get namespaceParentheses(): string { return "{namespace}"; }
    private static get extendParentheses(): string { return "{extends}"; }
    private static get implementsParentheses(): string { return "{implements}"; }
    private static get useParentheses(): string { return "{use}"; }

    public static createTemplate(data: ParseData, templates: string[]): string {
        return this.parse(data, templates);
    }

    private static parse(data: ParseData, templates: string[]): string {
        let result = "";
    
        for (let i = 0; i < templates.length; i++) {
            let line = templates[i];

            if (line.includes(this.nameParentheses)) {
                line = this.parseName(line, data);
            }

            if (line.includes(this.namespaceParentheses)) {
                line = this.parseNamespace(line, data);
            }

            if (line.includes(this.extendParentheses)) {
                line = this.parseExtend(line, data);
            }

            if (line.includes(this.implementsParentheses)) {
                line = this.parseImplements(line, data);
            }

            if (line.includes(this.useParentheses)) {
                line = this.parseUse(line, data);
            }

            result += line + '\n';
        }

        return result;
    }

    private static parseName(line: string, data: ParseData): string {
        return line.replace(this.nameParentheses, data.getName());
    }

    private static parseNamespace(line: string, data: ParseData): string {
        return line.replace(this.namespaceParentheses, data.getNamespace());
    }

    private static parseExtend(line: string, data: ParseData): string {
        let content = "";

        if (data.hasExtendClass()) {
            content = "extends " + data.getExtendClassWithoutNamespace() as string;
        }
        
        return line.replace(this.extendParentheses, content);
    }

    private static parseImplements(line: string, data: ParseData): string {
        let content = "";

        if (data.hasExtendInterfaces()) {
            let interfacesNames = data.getExtendInterfacesWithoutNamespace() as string[];

            if (interfacesNames.length > 0) {
                content = "implements " + interfacesNames.join(", ");
            }
        }
        
        return line.replace(this.implementsParentheses, content);
    }

    private static parseUse(line: string, data: ParseData): string {
        let content = "";

        if (data.hasExtendClass()) {
            content = PhpUtils.use(data.getExtendClass() as string);

            if (data.hasExtendInterfaces()) {
                content += "\n";
            }
        }

        if (data.hasExtendInterfaces()) {
            const interfaces = data.getExtendInterfaces() as string[];

            for (let i = 0; i < interfaces.length; i++) {
                const interfaceNamespace = interfaces[i];
                
                content += PhpUtils.use(interfaceNamespace);

                if (i !== interfaces.length - 1) {
                    content += "\n";
                }
            }
        }

        return line.replace(this.useParentheses, content);
    }
}
