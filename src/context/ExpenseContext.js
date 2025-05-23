import { createContext, useContext } from "react";

export const ExpenseContext=createContext({
    transaction:[
        {
            title:"Food",
            desc:"chicken rice",
            amount:30,
            date:"20 Nov"
        }
    ],
    addItem:()=>{},
    deleteItem:()=>{}
})

export const useExpense=()=>{
    return useContext(ExpenseContext)
}

export const ExpenseProvider=ExpenseContext.Provider
