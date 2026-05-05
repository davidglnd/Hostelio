import jwt from "jsonwebtoken";
import Expense from "../models/Expense.js";
export async function addExpenses(req, res) {
    try{
        const { name, amount, date, concept, supplier } = req.body;
        const description = req.body.description || "No hay observaciones para este gasto."
        const idUser = req.user.id;

        const newExpense = new Expense({
            description,
            amount,
            date,
            concept,
            supplier,
            idUser,
        });
        console.log(newExpense)
        await newExpense.save();

        res.status(201).json(newExpense);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error al crear el gasto." });
    }

}