import "../styles/RapportList.css"
import {useEffect, useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import bonhomme_perplexe from "../assets/bonhomme_perplexe.png"

function RapportList({RapportsIsOpen ,SetRapportsIsOpen , FormNewRapportIsOpen, SetFormNewRapportIsOpen,rapports, setRapports }){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    
    const [rapportSelected, setRapportSelected] = useState()
    const [dateSelected, setDateSelected] = useState()
    

    
    function onChangeInputDate(date){
        
        if(typeof date === "undefined" || date === null){
           return
        }
        else{
            //On met a jour la date
            setDateSelected(date)
            //On cherche le rapport corespondant à la date
            const rapport = rapports.find((rapport) => rapport.date === date)
            console.log("rapport selectionnée : "+rapport)
            //Si aucun rapport on remet à zéros rapportSelected
            if(typeof rapport === "undefined"){
                setRapportSelected()
            //Sinon on crée un nouvelle objet 
            }else {
                setRapportSelected({
                ID : rapport.ID,
                date : date,
                chambres : rapport.chambres
            })
            
            }
            
        }
        
    }

    function onClickBtnNewRapport(){
        SetRapportsIsOpen(false)
        SetFormNewRapportIsOpen(true)
    }
    
    function etatToString(etat){
        let etatString = ""
        switch(etat){
            case "0":
                etatString = (" - ")
                break
            case "1" :
                etatString = (" OKAF ")
                break
            case "2" :
                etatString = (" OK ")
                break
            case "3" :
                etatString = (" Sac ")
                break
            case "4" :
                etatString = (" OKAFR ")
                break
            default :
                etatString = (" Donnée manquante ")
        }
        return (etatString)
    }
    

    useEffect(() => {
        fetch("https://loicjaegle.com/api.php?get_rapports=true")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                setIsLoaded(true)
                result.map(res => (
                    res.chambres = JSON.parse(res.chambres)
                ))
                
                setRapports(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    },[])
    if(error){
        return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
        return <div>Chargement des rapports...</div>
    } else {
        
        return RapportsIsOpen ?(
            <div className="rapportlist">
                
                
                <div className="nav_rapportlist">
                    <div>
                        <label htmlFor="select_date_rapports">Rapport du : </label>
                        <input name="select_date_rapport" type="date" onChange={ (e) => onChangeInputDate(e.target.value) }/>
                    </div>
                    
                    <div className="btn_nouveau_rapport" onClick={() => onClickBtnNewRapport()}>Nouveau Rapport</div>
                </div>
                
                {/* Nav avec le nombretotal de chambres faites, pas faites etc... */}
                {typeof rapportSelected === "undefined" ?
                     <div></div> 
                     : 
                     <div className="nav_total_etat_chambres">
                        <div><FontAwesomeIcon icon={faCircle} className="etat-0"/> Pas faites : {rapportSelected.chambres.filter(chambre => chambre.etat === "0").length} </div>
                        <div><FontAwesomeIcon icon={faCircle} className="etat-1"/> OKAF : {rapportSelected.chambres.filter(chambre => chambre.etat === "1").length } </div>
                        <div><FontAwesomeIcon icon={faCircle} className="etat-2"/> OK : {rapportSelected.chambres.filter(chambre => chambre.etat === "2").length } </div>
                        <div><FontAwesomeIcon icon={faCircle} className="etat-3"/> Sac : {rapportSelected.chambres.filter(chambre => chambre.etat === "3").length } </div>
                        <div><FontAwesomeIcon icon={faCircle} className="etat-4"/> OKAFR : {rapportSelected.chambres.filter(chambre => chambre.etat === "4").length }</div>
                     </div>
                }
            
                { typeof rapportSelected === "undefined" ? 
                    
                    <div className="container_aucun_rapport">
                        <img src={bonhomme_perplexe} alt="bonhomme perplexe" className="bonhomme_perplexe"/>
                        <div>Aucun rapport enregistré à cette date !</div>
                    </div> 
                    :
                    <div className="list_chambres">  {rapportSelected.chambres.map((chambres) => (
                        <div className="chambre" key={chambres.ID}><FontAwesomeIcon icon={faCircle} className={"etat-"+chambres.etat} /> Chambre {chambres.nom} : {etatToString(chambres.etat)}</div>
                        
                        
                ))}</div>
                
                }
            
            </div>
            
        ) : (<div></div>)
    }
}



export default RapportList