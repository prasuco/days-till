import CountdownTimer from "./CountdownTimer"
import { quotes } from "./quotes"
import { useGoalStore } from "./stores/goalStore"
import Sidebar from "./components/Sidebar"

function App() {
  const randomQuoteId = Math.ceil(Math.random() * quotes.length)
  const goalStore = useGoalStore()

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {goalStore.selectedGoal ? (
          <CountdownTimer
            date={new Date(goalStore.selectedGoal.targetDate)}
            title={goalStore.selectedGoal.name}
          />
        ) : (
          "Please Add Goals"
        )}
        <div className="m-8 flex flex-row text-center">
          {quotes.find((quote) => quote.id == randomQuoteId)?.quote}
        </div>
      </div>
    </div>
  )
}

export default App
