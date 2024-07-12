import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";


const cadastrar_concessionaria = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
 
  const salvar = async (campos) => {
    try {
      //vamos enviar os dados digitados para a rota /user do backend
      const response = await api.post("concessionaria", campos);
      setAviso(`Cadastrado com sucesso!`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar Concessionária!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Concessionária</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group mt-2">
            <label htmlFor="nome">Nome da concessionária:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              {...register("nome")}
            />
          </div> 

          
         
                   
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default cadastrar_concessionaria;
