import React,{useContext} from "react";
import* as yup from"yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/userAuth";
import Api from "../../context/Apicontext";
import styles from "../../assets/styles/Offres.module.scss"

function Offres() {
    const{ user } = useAuth()
    const{SOURCE} = useContext(Api)
    const defaultValues={
      titre:"",
      salaire:"",
      description:"",
      competences:""

    }
    const formSchema = yup.object({
        titre: yup.string().required("Le nom de la position est requis"),
        salaire: yup.string().required("le salaire est requis"),
        description: yup.string().required("Description de l'emploi est requise"),
        competences: yup.string().required("Ajoutez une competence")
      });
      
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({  defaultValues ,resolver: yupResolver(formSchema) });

      const submit = async (values) => {
        let dataOffre ={
            "titre": values.titre,
            "recruteur_id": String( user.company_id),
            "salaire": values.salaire,
            "description": values.description,
            "competences": values.competences
        }
        
        console.log(dataOffre);
        const response= await fetch(`${SOURCE}/offres`, {
        
        method:"POST",
        
        headers:{"Content-Type":"application/json"},
        
        body:JSON.stringify(dataOffre),
        });
        const data= await response.json()
        console.log('reponse:',data)
       
        };

  return (
    <div className="p-20">
    <h2> Ajouter Une Offres </h2>
     <form action="" onSubmit={handleSubmit(submit)} className={`${styles.form_layout}`}>
        
        <div className="p-10">
          <label htmlFor="titre" className="p-5">Position</label>
        <input type="text" id="titre" {...register("titre")} />
        </div>

        <div className="p-10">
          <label htmlFor="salaire" className="p-5">Salaire</label>
        <input type="text" id="salaire" {...register("salaire")} />
        </div>

        <div className="p-10 d-flex flex-column">
          <label htmlFor="competences" className="p-5">Competences</label>
          <textarea type="text" id="competences" {...register("competences")} />
        </div>


        <div className="p-10 d-flex flex-column">
        <label htmlFor="description" className="p-5">Description</label>
        <textarea type="text" id="description" {...register("description")} />
        </div>
       

      
        <button type="submit">Ajouter L'offre</button>
        
      </form>
    </div>
  )
}

export default Offres