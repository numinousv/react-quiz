// src/routes/emu.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Gamepad2, Download, Play, Pause, RotateCcw, Save, Upload, Fullscreen } from "lucide-react"

export const Route = createFileRoute("/emu")({
  component: EmuPage,
})

function EmuPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [romFile, setRomFile] = useState<File | null>(null)
  const [gameLoaded, setGameLoaded] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [nostalgistLoaded, setNostalgistLoaded] = useState(false)
  
  // Load Nostalgist on component mount
  useEffect(() => {
    loadNostalgist()
  }, [])
  
  const loadNostalgist = async () => {
    try {
      // dynamic import
      const { Nostalgist } = await import('nostalgist')
      
      // Store on window for easy access
      ;(window as any).Nostalgist = Nostalgist
      setNostalgistLoaded(true)
      console.log("Nostalgist loaded successfully")
    } catch (err) {
      console.error("Failed to load Nostalgist:", err)
      setError("Failed to load emulator. Please refresh the page.")
    }
  }
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.name.toLowerCase().endsWith('.nes')) {
        setRomFile(file)
        setError(null)
      } else {
        setError("Please select a valid .nes ROM file")
      }
    }
  }
  
  // Launch game with uploaded ROM
  const launchGame = async () => {
    if (!romFile) {
      setError("Please select a ROM file first")
      return
    }
    
    if (!(window as any).Nostalgist) {
      setError("Emulator not loaded. Please refresh the page.")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Launch game using Nostalgist.nes()
      const instance = await (window as any).Nostalgist.nes(romFile)
      
      setGameLoaded(true)
      console.log("Game launched successfully:", instance)
      
    } catch (err: any) {
      console.error("Failed to launch game:", err)
      setError(`Failed to launch game: ${err.message || "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }
  
  // Launch a demo game
  const launchDemo = async () => {
    if (!(window as any).Nostalgist) {
      setError("Emulator not loaded. Please refresh the page.")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Launch demo - using a known working demo URL
      const instance = await (window as any).Nostalgist.nes({
        core: 'fceumm',
        rom: 'https://files.catbox.moe/qya8l0.nes'
      })
      
      setGameLoaded(true)
      setRomFile(new File([], "Battletoads"))
      console.log("Demo launched successfully:", instance)
      
    } catch (err: any) {
      console.error("Failed to launch demo:", err)
      setError(`Failed to launch demo: ${err.message || "Unknown error"}`)
      
      // Try alternative approach
      try {
        setError("Trying alternative method...")
        const instance2 = await (window as any).Nostalgist({
          core: 'fceumm',
          rom: 'https://files.catbox.moe/qya8l0.nes'
        })
        setGameLoaded(true)
        setError(null)
      } catch (err2: any) {
        setError(`Both methods failed: ${err2.message}`)
      }
    } finally {
      setLoading(false)
    }
  }
  
  // Game controls
  const handlePause = () => {
    // Will be implemented once we have the instance
    alert("Pause functionality requires storing the Nostalgist instance")
  }
  
  const handleResume = () => {
    alert("Resume functionality requires storing the Nostalgist instance")
  }
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }
  
  // Reset everything
  const resetGame = () => {
    setGameLoaded(false)
    setRomFile(null)
    setError(null)
  }
  
  // Simple test to check if Nostalgist.nes() exists
  const testNostalgist = () => {
    console.log("Testing Nostalgist...")
    console.log("window.Nostalgist:", (window as any).Nostalgist)
    console.log("typeof window.Nostalgist:", typeof (window as any).Nostalgist)
    console.log("window.Nostalgist.nes:", (window as any).Nostalgist?.nes)
    console.log("All properties:", Object.keys((window as any).Nostalgist || {}))
  }
  
  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">NES Emulator</CardTitle>
                <p className="text-muted-foreground">
                  {nostalgistLoaded ? "Ready to play!" : "Loading emulator..."}
                </p>
              </div>
            </div>
            <Button 
              onClick={testNostalgist} 
              variant="ghost" 
              size="sm"
              className="hidden sm:inline-flex"
            >
              Debug
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status indicators */}
          {!nostalgistLoaded && (
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Loading emulator library...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
          
          {/* Game area */}
          <div className="relative">
            <div className={`bg-black rounded-lg overflow-hidden min-h-[480px] flex items-center justify-center ${
              !gameLoaded ? 'border-2 border-dashed border-gray-800' : ''
            }`}>
              {!gameLoaded ? (
                <div className="text-center p-8 text-gray-500">
                  <Gamepad2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No game loaded</p>
                  <p className="text-sm">Upload a ROM or try the demo</p>
                </div>
              ) : (
                <div className="text-center p-8 text-green-500">
                  <Gamepad2 className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg mb-2">Game is running!</p>
                  <p className="text-sm">Check the emulator window that opened</p>
                </div>
              )}
            </div>
            
            {/* Fullscreen button */}
            {gameLoaded && (
              <Button
                onClick={toggleFullscreen}
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4"
              >
                <Fullscreen className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Controls */}
          <div className="space-y-6">
            {!gameLoaded ? (
              // Load game controls
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".nes"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="rom-upload"
                    />
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      disabled={!nostalgistLoaded}
                    >
                      <label htmlFor="rom-upload" className="cursor-pointer flex items-center justify-center">
                        <Download className="mr-2 h-4 w-4" />
                        {romFile ? "Change ROM File" : "Upload ROM File"}
                      </label>
                    </Button>
                    {romFile && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        Selected: {romFile.name} ({(romFile.size / 1024).toFixed(0)} KB)
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={launchGame}
                      disabled={!romFile || loading || !nostalgistLoaded}
                      className="min-w-[120px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Launch Game
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={launchDemo}
                      disabled={loading || !nostalgistLoaded}
                      variant="secondary"
                    >
                      Try Battletoads
                    </Button>
                  </div>
                </div>
                
                {/* Quick test buttons */}
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Quick test:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={async () => {
                        if (!(window as any).Nostalgist) return
                        setLoading(true)
                        try {
                          // Test if Nostalgist.nes exists
                          console.log("Testing .nes() method...")
                          console.log("Nostalgist:", (window as any).Nostalgist)
                          console.log(".nes method:", (window as any).Nostalgist.nes)
                          
                          // Try calling it
                          const result = await (window as any).Nostalgist.nes?.()
                          console.log("Result:", result)
                          alert(".nes() method exists! Check console.")
                        } catch (err) {
                          console.error("Test failed:", err)
                          alert("Test failed. Check console.")
                        } finally {
                          setLoading(false)
                        }
                      }}
                    >
                      Test .nes() method
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        console.log("All window.Nostalgist properties:")
                        console.log(Object.keys((window as any).Nostalgist || {}))
                        alert("Check console for properties")
                      }}
                    >
                      List Properties
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Game controls
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={handlePause} variant="outline" size="sm">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                  <Button onClick={handleResume} variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                  <Button onClick={toggleFullscreen} variant="outline" size="sm">
                    <Fullscreen className="mr-2 h-4 w-4" />
                    {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  </Button>
                  <Button onClick={resetGame} variant="destructive" size="sm">
                    Load New Game
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Instructions */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-medium mb-2">How it works:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Nostalgist will open the game in a new emulator window</li>
              <li>• Upload your .nes file or try the demo</li>
              <li>• If nothing happens, check for popup blockers</li>
              <li>• Use the Debug button to check if Nostalgist loaded correctly</li>
              <li>• Press F11 for fullscreen in the emulator window</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmuPage