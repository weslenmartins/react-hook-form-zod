import { Dispatch, SetStateAction } from "react"

interface AsideProps {
  output: string
  setOutput: Dispatch<SetStateAction<string>>
}


export function Aside({output, setOutput}: AsideProps) {

  function handleCloseAside() {
    setOutput('')
  }

  return (
    <aside
      className={`flex flex-col gap-8 absolute top-1/2 -translate-y-1/2 h-[95%] w-[552px] bg-zinc-800 rounded-l-2xl p-6 text-zinc-200 transition-all duration-700 ${output ? 'right-0 opacity-100' : '-right-[552px] opacity-5'}`}
    >
      <div>
        <button
          type="button"
          className="bg-zinc-200 font-medium text-sm text-zinc-800 px-4 py-2 rounded-md shadow-sm outline-none hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-200"
          onClick={handleCloseAside}
        >
          Fechar
        </button>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Dados enviados 🚀</h3>
        <pre className="text-xs">{output}</pre>
      </div>
    </aside>
  )
}