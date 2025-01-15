"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SplitSmart() {
  const [billAmount, setBillAmount] = useState<number>(0)
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2)
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0)

  useEffect(() => {
    const calculatedTip = billAmount * (tipPercentage / 100)
    const calculatedTotal = billAmount + calculatedTip
    setTipAmount(calculatedTip)
    setTotalAmount(calculatedTotal)
    setAmountPerPerson(numberOfPeople > 0 ? calculatedTotal / numberOfPeople : 0)
  }, [billAmount, tipPercentage, numberOfPeople])

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNumberOfPeople(value === '' ? 0 : Math.max(0, parseInt(value, 10)))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">SplitSmart</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bill-amount" className="text-sm font-medium text-gray-700">Bill Amount</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount || ''}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tip-percentage" className="text-sm font-medium text-gray-700">Tip: {tipPercentage}%</Label>
            <Slider
              id="tip-percentage"
              min={0}
              max={30}
              step={1}
              value={[tipPercentage]}
              onValueChange={(value) => setTipPercentage(value[0])}
              className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-600 [&_[role=slider]]:shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-of-people" className="text-sm font-medium text-gray-700">Number of People</Label>
            <Input
              id="number-of-people"
              type="number"
              min="0"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4 mt-8 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Tip Amount:</span>
            <span className="text-xl font-semibold text-blue-600">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="text-xl font-semibold text-blue-600">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-gray-600 font-medium">Per Person:</span>
            <span className="text-xl font-semibold text-blue-600">${amountPerPerson.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            navigator.clipboard.writeText(
              `Tip: $${tipAmount.toFixed(2)}\nTotal: $${totalAmount.toFixed(2)}\nPer Person: $${amountPerPerson.toFixed(2)}`
            );
            alert("Results copied to clipboard!");
          }}
        >
          Copy Results
        </Button>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Effortlessly split bills with friends and family.</p>
        </div>
      </div>
    </div>
  )
}

