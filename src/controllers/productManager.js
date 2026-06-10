import { existsSync, mkdirSync, writeFileSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
 

class ProductManager {
    constructor() {

        this.folderPath = path.join(process.cwd(), "src", "data");
        this.filePath = path.join(this.folderPath, "products.json")

        if(!existsSync(this.folderPath)){
            mkdirSync(this.folderPath, { recursive: true });
        }
        if(!existsSync(this.filePath)){
            writeFileSync(this.filePath, "[]");
        }
        
    }

    //dry? read/write
    async getProducts() {
        try {
            const result = await fs.readFile(this.filePath, "utf-8")
            return JSON.parse(result)            
        } catch (error) {
            console.log("no hay data", error);
            return []            
        }
    }

    async addProducts (productData) {
        try {
            const content = await this.getProducts();
            const repeat = content.find(p => p.title === productData.title)
            if(repeat){
                console.log("el producto ya existe")
                return
            }
            const newProduct = {id: randomUUID(), ...productData};
            content.push(newProduct);
            await fs.writeFile(this.filePath, JSON.stringify(content, null, 2), "utf-8")    
            return newProduct  

        } catch (error) {
            console.log(error);
        }
    }


    getById

    update

    delete

}

export default ProductManager;