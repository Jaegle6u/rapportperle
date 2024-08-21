import "../styles/FormNewRapport.css"
import $ from "jquery"


function FormNewRapport({FormNewRapportIsOpen, SetFormNewRapportIsOpen,rapports,setRapports,SetRapportsIsOpen}){
    const aujourdhui = new Date()
    const listes_des_chambres = ["001","002","101","102","103","104","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319"]
    
    function onClickBtnRetour(){
        SetRapportsIsOpen(true)
        SetFormNewRapportIsOpen(false)
    }

    function onClickBtnValiderNouveauRapport(){
        let DATE = new Date()
        let date = DATE.getFullYear() +"/"+(DATE.getMonth()+1)+"/"+DATE.getDate()
        //console.log(date)
        let chambres = []
        let btn_radio_check = []
        
        listes_des_chambres.map((chambre) =>
           btn_radio_check.push(document.querySelectorAll(".btn_radio[name = '"+ chambre+"']:checked"))
        )
        //console.log(btn_radio_check)

       for(let i = 0; i < listes_des_chambres.length;i++){
        chambres.push({ID : i , nom : listes_des_chambres[i], etat : btn_radio_check[i][0].value})
            
       }
       // Les options par défaut sont indiquées par *

       
        //console.log(chambres)

        let rapport = {new_rapport : true ,date : date, chambres : JSON.stringify(chambres)}
        //console.log(rapport)
        
        $.post("https://loicjaegle.com/api.php",
            {new_rapport : true ,date : date , chambres :JSON.stringify(chambres)},
            function (data) {
                console.log(data)
                data = JSON.parse(data)
                data.map(res => (
                    res.chambres = JSON.parse(res.chambres)
                ))
                setRapports(data)
                SetFormNewRapportIsOpen(false)
                
                
            }
        )
        
    }

    return FormNewRapportIsOpen ?(
        <div className="form_new_rapport">
        <div className="nav_form_new_rapport">
             <h2>Nouveau rapport pour le {aujourdhui.getDate()}/{aujourdhui.getMonth()+1}/{aujourdhui.getFullYear()} </h2>
             <div className="btn_retour" onClick={() => onClickBtnRetour()}>Retour</div>
        </div>
           
            <p className="aide_form_new_rapport">Cliquez sur les boutons pour sélectionner l'état de la chambre, les options en violets seront sauvegardées </p>
            <div>
                {listes_des_chambres.map((chambre) => 
                    <div className="ligne_form" key={chambre}>
                        <div className="nom_chambre">{chambre} : </div>
                        
                        
                        <input className="btn_radio" type="radio" name={chambre} value="0" id={chambre + "_0"} defaultChecked/>
                        <label className="label_radio" htmlFor={chambre + "_0"}>Pas Faite</label>
                        <input className="btn_radio" type="radio" name={chambre} value="1" id={chambre + "_1"} />
                        <label className="label_radio" htmlFor={chambre + "_1"}>OKAF</label>
                        <input className="btn_radio" type="radio" name={chambre} value="2" id={chambre + "_2"}/>
                        <label className="label_radio" htmlFor={chambre + "_2"}>OK</label>
                        <input className="btn_radio" type="radio" name={chambre} value="3" id={chambre + "_3"}/>
                        <label className="label_radio" htmlFor={chambre + "_3"}>Sac</label>
                        <input className="btn_radio" type="radio" name={chambre} value="4" id={chambre + "_4"}/>
                        <label className="label_radio" htmlFor={chambre + "_4"}>OKAFR</label>

                    </div>
                    
                )}
            </div>
            <div className="btn_valider_nouveau_rapport" onClick={() => onClickBtnValiderNouveauRapport()}>Valider nouveau Rapport</div>
        </div>
    ): (<div></div>)

}

export default FormNewRapport