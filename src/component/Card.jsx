import React from 'react'

const Card = ({trans}) => {
  return (
    <div className="bg-gray-100 rounded-xl p-2 flex items-center justify-between w-full shadow-md">
      {/* Icon + Text */}
      <div className="flex items-center gap-4">
        <div className="bg-pink-600 p-4 rounded-xl">
          {/* <Heart className="text-white" size={20} /> */}
        </div>
        <div>
          <h3 className="text-base font-medium">{trans.title}</h3>
          <p className="text-sm text-gray-500">{trans.desc}</p>
        </div>
      </div>

      {/* Amount & Date */}
      <div className="text-right">
        <p className={trans.amount>=0 ? "text-green-500 font-semibold":"text-red-500 font-semibold"}>{trans.amount}</p>
        <p className="text-sm text-gray-500">{trans.date}</p>
      </div>
    </div>
  )
}

export default Card