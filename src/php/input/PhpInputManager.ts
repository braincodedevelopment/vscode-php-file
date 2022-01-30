import { InputManager } from "../../input/InputManager";
import { PhpUtils } from "../PhpUtils";
import * as Helper from "../../helper";

export class PhpInputManager extends InputManager {
    public static async inputToParseData(
        name: string,
        extend: boolean,
        interfaces: boolean
    ) {
        const namespace = await this.requiredInput(this.createOption(name));

        if (Helper.isString(namespace)) {
            let data = PhpUtils.convertNamespaceToParseData(namespace as string);

            if (data !== undefined) {
                if (extend) {
                    const extend = await this.input(this.createOption("Extends"));

                    if (Helper.isString(extend)) {
                        data.setExtendClass(extend as string);
                    }
                }

                if (interfaces) {
                    const interfaces = await this.input(this.createOption("Interfaces", false));

                    if (Helper.isString(interfaces)) {
                        const interfacesNames = PhpUtils.parseNamespaces(interfaces as string);
    
                        data.setExtendInterfaces(interfacesNames);
                    }
                }

                return data;
            }
        }

        return undefined;
    }
}
