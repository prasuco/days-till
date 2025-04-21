import CountdownTimer from "./CountdownTimer"
import { quotes } from "./quotes"


function App() {
  const randomQuoteId = Math.ceil(Math.random() * quotes.length)
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">

        <CountdownTimer date={new Date(2026, 3, 20)} title="Next Birthday" />

        <div className="m-8 flex flex-row text-center">

          {quotes.find((quote) => quote.id == randomQuoteId)?.quote}
        </div>
      </div>
    </>
  )
}

export default App
