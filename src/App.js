import './App.css';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import ResponsiveHeader from './components/responsiveHeader'

function App() {
  return (
    <Grommet full theme={grommet}>
      <Box fill="vertical"> 
        <ResponsiveHeader/>
        <GensiForm></GensiForm>
      </Box>
    </Grommet>
  );
}

export default App;
