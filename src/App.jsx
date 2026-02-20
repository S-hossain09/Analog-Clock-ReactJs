import { Box } from "@mui/material"
import Clock from "./src/Clock"

function App() {
  return (
    <Box sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:"100vh",


    }}>
      <Clock/>
    </Box>
  )
}

export default App
