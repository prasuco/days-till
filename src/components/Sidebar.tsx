import { useState } from "react"
import { useGoalStore } from "../stores/goalStore"
import { Plus, X, Calendar, Target } from "lucide-react"

const Sidebar = () => {
  const goalStore = useGoalStore()
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [goalName, setGoalName] = useState("")
  const [targetDate, setTargetDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalName || !targetDate) return
    goalStore.addGoal(goalName, new Date(targetDate))
    setGoalName("")
    setTargetDate("")
    setIsAddingGoal(false)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    goalStore.removeGoal(id)
    if (goalStore.selectedGoal?.id === id) {
      goalStore.setSelectedGoal(null)
    }
  }

  return (
    <aside className="w-20 hover:w-80 group transition-all duration-300 ease-in-out bg-gray-800 h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <Target className="w-6 h-6" />
        </div>
        <div className="flex-1 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-xl font-bold ml-2 whitespace-nowrap">Goals</h2>
          <button
            onClick={() => setIsAddingGoal(true)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            title="Add New Goal"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
        {/* Add Goal Form */}
        {isAddingGoal && (
          <div className="mb-4 bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">New Goal</h3>
              <button
                onClick={() => setIsAddingGoal(false)}
                className="p-1.5 rounded-full hover:bg-gray-600/50 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm mb-2">
                  <Target className="w-4 h-4" />
                  <span>Goal Name</span>
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full p-2.5 bg-gray-600/50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/50 outline-none"
                  placeholder="Enter goal name"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Target Date</span>
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full p-2.5 bg-gray-600/50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/50 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600/90 hover:bg-blue-600 p-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </form>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-2 overflow-y-auto">
          {goalStore.goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => goalStore.setSelectedGoal(goal.id)}
              className={`group/item p-3 rounded-lg cursor-pointer transition-all ${
                goalStore.selectedGoal?.id === goal.id
                  ? "bg-blue-600/90"
                  : "bg-gray-700/50 hover:bg-gray-600/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">{goal.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(goal.id, e)}
                  className="opacity-0 group-hover/item:opacity-100 p-1.5 rounded-full hover:bg-red-500/50 transition-all"
                  title="Delete Goal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </aside>
  )
}

export default Sidebar