import Navbar from './components/layout/Navbar'
import Button from './components/ui/Button'

function App() {
  return (
    <>
      <Navbar />
      <main
        id="home"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-5xl font-bold md:text-7xl">NovaDesign</h1>
        <p className="mt-4 text-soft">Phase 02: UI Foundation</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </main>
    </>
  )
}

export default App