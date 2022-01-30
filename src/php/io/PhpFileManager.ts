import * as FileManager from "fs";
import * as Path from "path";

export class PhpFileManager {
    public static async createFile(path: string, className: string, content: string) {
        const filename = Path.join(path, className + ".php");
        
        FileManager.writeFileSync(filename, content);
    }
}
