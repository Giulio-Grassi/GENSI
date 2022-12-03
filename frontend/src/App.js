import './App.css';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import ResponsiveHeader from './components/responsiveHeader'
import { useState } from 'react';
import { acme } from "./components/assets/themes/theme";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
import { observer } from "mobx-react-lite"


const ObservedGensiForm = observer(({darkMode}) => <GensiForm darkMode={darkMode}></GensiForm>)
const theme = deepMerge(grommet, acme);
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Grommet
      full
      theme={theme}
      themeMode={darkMode ? "dark" : "light"}
    >
      <Box fill="vertical"> 
        <ResponsiveHeader darkMode={darkMode} setDarkMode={setDarkMode}/>
        <ObservedGensiForm darkMode={darkMode}></ObservedGensiForm>
      </Box>
    </Grommet>
  );
}

export default App;
