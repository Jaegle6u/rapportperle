import { useState } from 'react';
import '../styles/App.css';
import RapportList from './RapportList';
import FormNewRapport from './FormNewRapport';
function App() {
  document.title = "Rapport Perle des Vosges"
  const [RapportsIsOpen, SetRapportsIsOpen] = useState(true)
  const [FormNewRapportIsOpen, SetFormNewRapportIsOpen] = useState(false)
  const [rapports, setRapports] = useState([])

  return (
    <div>
      <RapportList 
        RapportsIsOpen = {RapportsIsOpen} 
        SetRapportsIsOpen = {SetRapportsIsOpen} 
        FormNewRapportIsOpen = {FormNewRapportIsOpen} 
        SetFormNewRapportIsOpen = {SetFormNewRapportIsOpen}
        rapports = {rapports}
        setRapports = {setRapports}

      />
      <FormNewRapport 
        FormNewRapportIsOpen = {FormNewRapportIsOpen} 
        SetFormNewRapportIsOpen = {SetFormNewRapportIsOpen}
        rapports = {rapports}
        setRapports = {setRapports}
        SetRapportsIsOpen = {SetRapportsIsOpen}
      />
    </div>
  )
}

export default App;
