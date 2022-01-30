import { PhpUtils } from "./PhpUtils";

export class ParseData {
    private name: string;
    private namespace: string;

    private extendClass: string | undefined;
    private extendInterfaces: string[] | undefined;

    public constructor(name: string, namespace: string) {
        this.name = name;
        this.namespace = namespace;
    }

    public getName(): string {
        return this.name;
    }

    public getNamespace(): string {
        return this.namespace;
    }

    public getExtendClass(): string | undefined {
        return this.extendClass;
    }

    public getExtendClassWithoutNamespace(): string | undefined {
        if (this.hasExtendClass()) {
            return PhpUtils.getNamespaceToClassName(this.extendClass as string);
        }
    }

    public getExtendInterfaces(): string[] | undefined {
        return this.extendInterfaces;
    }

    public getExtendInterfacesWithoutNamespace(): string[] | undefined {
        return this.extendInterfaces?.map(function (name: string): string {
            return PhpUtils.getNamespaceToClassName(name);
        });
    }

    public setExtendClass(extendClass: string | undefined): void {
        this.extendClass = extendClass;
    }

    public setExtendInterfaces(interfaces: string[] | undefined): void {
        this.extendInterfaces = interfaces;
    }

    public hasExtendClass(): boolean {
        return this.extendClass !== undefined;
    }

    public hasExtendInterfaces(): boolean {
        return this.extendInterfaces !== undefined;
    }
}
