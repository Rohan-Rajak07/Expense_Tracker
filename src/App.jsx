import { useEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import { ExpenseProvider } from "./context";
import {  Plus ,Trash2 } from "lucide-react";


function App() {

  
  const[transaction,setTransaction]=useState([])
  const[input,setInput]=useState("hidden")
  const[title,setTitle]=useState("")
  const[desc,setDesc]=useState("")
  const[date,setDate]=useState("")
  const[TotalBal,setTotalBal]=useState(0)
  const[TotalInc,setTotalInc]=useState(0)
  const[TotalEx,setTotalEx]=useState(0)

 

  let income=0;
  let expense=0;

   useEffect(()=>{
    const datee = new Date();
    const day = datee.getDate();
    const month = datee.toLocaleString("default", { month: "short" }); // "May"
    const result = `${day} ${month}`
    setDate(result);

    //LOCAL STORAGE
    const data=JSON.parse(localStorage.getItem("TransData"));
    const TBalance=JSON.parse(localStorage.getItem("TotalBalance"));
    const TExp=JSON.parse(localStorage.getItem("TotalExpense"));
    const TInc=JSON.parse(localStorage.getItem("TotalIncome"));
    if(data && data.length>0)
    {
      setTransaction(data)
      setTotalBal(TBalance)
      setTotalEx(TExp)
      setTotalInc(TInc)
    }
    console.log(data);
    console.log(TBalance+" "+TExp+" "+TInc);

  },[])

  //LOCAL STORAGE to GET ITEM
  useEffect(()=>{
    localStorage.setItem("TransData",JSON.stringify(transaction))
    localStorage.setItem("TotalBalance",JSON.stringify(TotalBal))
    localStorage.setItem("TotalExpense",JSON.stringify(TotalEx))
    localStorage.setItem("TotalIncome",JSON.stringify(TotalInc))

  },[transaction])

  const handleBalance=()=>
  {
    let x=income-expense;
    if(x>=0)
    {
      setTotalInc(TotalInc+x);
      setTotalBal(TotalBal+x);
    }
    else
    {
      setTotalEx(TotalEx + (-x));
      setTotalBal(TotalBal+x);
    }
    console.log(x);
    setTransaction([{title, desc, amount:x, date},...transaction])
    setTitle("")
    setDesc("")
  }

  const addItem=()=>{}

  const deleteItem=()=>{}
  return (
    <ExpenseProvider value={{transaction,addItem,deleteItem}}>
    <div className="h-screen w-screen bg-red-200 flex items-center justify-center">
      <div className="MainBox w-full h-full sm:w-1/5 sm:h-5/6 bg-gray-800  sm:rounded-lg shadow-2xl px-5 relative">
        <div className="innnerbox bg-white w-full h-36 rounded-lg py-3 px-4 my-6 relative">
          <button 
            onClick={()=>
              {
                alert("Are You really want to delete Data")
                setTransaction([])
                setTotalBal(0);
                setTotalInc(0);
                setTotalEx(0);

              }
            }
            className="clear absolute top-4 right-4 ">
            <Trash2 size={18}/>
          </button>
          <div className="balance w-full  h-1/2 ">
            <p>Toatal Balance</p>
            <p className={`font-bold text-2xl ${TotalBal >= 0 ? "text-green-500" : "text-red-500"}`}>Rs {TotalBal}</p>
          </div>
          <div className="expense w-full h-1/2 flex gap-1 items-end justify-center">
            <div className="b1 w-1/2">
              <p>Income</p>
              <p className="text-green-600 font-semibold">Rs {TotalInc}</p>
            </div>
            <div className="b2 w-1/2">
              <p className="text-center">Expense</p>
              <p className="text-red-600 font-semibold text-center">Rs {TotalEx}</p>
            </div>
          </div>
        </div>
        <p className="font-semibold text-white text-lg">Recent Transaction</p>
        <div className="transaction  w-full h-3/5 flex flex-col gap-3 py-3 overflow-y-auto scrollbar-hide ">
        {transaction.map((data, idx) => {
          return <Card trans={data} key={idx} />;
        })}
        </div>


        <button onClick={()=>{
          setInput("block")
        }}
        className="bg-white rounded-full p-2 absolute right-4 bottom-5">
          <Plus size={19}></Plus>
        </button>


        <div className={`input w-full h-full absolute top-0 left-0 z-10 rounded-md backdrop-blur-md flex flex-col justify-center items-center  ${input}`}>
          <div className="form w-5/6 h-2/3 bg-gray-400 flex flex-col justify-center items-center gap-5 p-5 rounded-md">

            <input className="w-full py-1 px-2 rounded-md outline-none"
            placeholder="Title"
            value={title}
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
            type="text" />

            <input className="w-full py-1 px-2 rounded-md outline-none" 
            placeholder="Description"
            value={desc}
            onChange={(e)=>{
              setDesc(e.target.value);
            }}
            type="text" />

            <input className="w-full py-1 px-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md md outline-green-600"
            placeholder="Income"
            onChange={(e)=>{
              income=e.target.value
            }}
            type="number" />
            

            <input className="w-full py-1 px-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md outline-red-600"
            placeholder="Expense"
            onChange={(e)=>{
              expense=e.target.value
            }}
            type="number" />

            <button 
            onClick={async ()=>{
              await handleBalance()
              // await addItem()
              setInput("hidden")
            }}
            className="bg-white px-1 py-1 rounded-md">Done</button>
          </div>
        </div>
      </div>
    </div>
  </ExpenseProvider>
  );
}

export default App;
