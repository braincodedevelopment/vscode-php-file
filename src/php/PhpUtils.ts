import { ParseData } from "./ParseData";

export class PhpUtils {
    public static get namespaceSeparator(): string { return "\\"; }

    public static isNamespaceValid(namespace: string): boolean {
        return /((?:\\{1}\w+|\w+\\{1})(?:\w+\\?)+)/.test(namespace);
    }

    public static getNamespaceToClassName(namespace: string): string {
        let classNames = this.getNamespaceToClassNames(namespace);

        return classNames[classNames.length - 1];
    }

    public static getNamespaceWithoutClassName(namespace: string): string {
        let classNames = this.getNamespaceToClassNames(namespace);

        return classNames.slice(0, classNames.length - 1).join("\\");
    }

    public static getNamespaceToClassNames(namespace: string): string[] {
        return namespace.split(this.namespaceSeparator);
    }

    public static convertNamespaceToParseData(namespace: string): ParseData | undefined {
        if (this.isNamespaceValid(namespace)) {
            const classNames = this.getNamespaceToClassNames(namespace);

            if (classNames.length >= 2) {
                return new ParseData(
                    classNames[classNames.length - 1],
                    classNames.slice(0, classNames.length - 1).join("\\")
                );
            }
        }

        return undefined;
    }

    public static convertNamespaceToStrings(namespace: string): string[] | undefined {
        const classNames = namespace.split("\\");

        if (classNames.length < 2) {
            return undefined;
        }
        
        return classNames;
    }

    public static parseNamespaces(namespaces: string): string[] {
        return namespaces.split(",").map(function (name: string): string {
            return name.trim();
        }).filter(function (name: string): boolean {
            return PhpUtils.isNamespaceValid(name);
        });
    }

    public static use(namespace: string) {
        return `use ${namespace};`;
    }
}
