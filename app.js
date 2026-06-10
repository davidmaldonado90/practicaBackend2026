import express from 'express';
import ProductManager from './src/controllers/productManager.js';

const app = express ()// crea app

const PORT = 8080 // puerto

app.use(express.json()) //midleware

const manager = new ProductManager();

app.get("/products", async (req,res)=> {
    try {
        const allproducts = await manager.getProducts()
        if(allproducts.length === 0){
            return res.status(404).json({error:"no hay productos"});}
            res.status(200).json(allproducts);
    } catch (error) {
        res.status(500).json({error:"error interno del servidor"})
    }
});

app.get("/users/:id",(req,res) =>{
    try {
        const id = Number(req.params.id);
        const usuario = users.find((u) => u.id === id);
        if(!usuario){
            return res.status(400).json({error: "usuario no encontrado"});
        }
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error:"error interno del servidor"})
    }
});

app.post("/products", async (req,res) => {
    try {
        const data = req.body;
        if (data.title || data.price){
            return res.status(400).json({ 
                error: "Faltan campos obligatorios o están mal escritos. Se requiere 'title' y 'price'." 
            });
        }
        const products = await manager.addProducts(data);
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({error:"error interno del servidor"})        
    }
});

app.put("/users/:id", (req,res) => {
    try {
        const id = Number(req.params.id);
        const usuario = users.find((u) => u.id === id);
        if(!usuario){
            return res.status(400).json({error: "usuario no encontrado"});
        }
        const {nombre, edad} = req.body
        usuario.nombre = nombre
        usuario.edad = edad;
        res.status(201).json({mensaje:"usuario modificado", usuario})
    } catch (error) {
        res.status(500).json({error:"error interno del servidor"})        
    }
})

app.delete("/users/:id", (req,res)=> {
    try {
        const id = Number(req.params.id);
        const usuario = users.find((u) => u.id === id);
        if(!usuario){
            return res.status(400).json({error: "usuario no encontrado"});
        }
        users = users.filter((u) => u.id !== id);
        res.status(200).json({ mensaje: "Usuario eliminado con éxito", usuario });      
    } catch (error) {
        res.status(500).json({error:"error interno del servidor"})
    }
})

// app.get("/",(req,res) => {
//     res.json ({
//         mensaje: "bienvenido"
//     })
// })

// app.post("/echo", (req,res) => {
//     const data = req.body;
//     res.json(data);
//     console.log(data);
    
// })

app.listen(PORT, () =>{
    console.log(`server run on port ${PORT}`);
});