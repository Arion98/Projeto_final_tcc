import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";


const cadastrar_automovel = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [concessionarias, setConcessionarias] = useState([]);

  useEffect(() => {
    const fetchConcessionarias = async () => {
      try {
        const response = await api.get("/concessionaria");
        setConcessionarias(response.data || []); // Ajustado para garantir que seja um array
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar concessionárias:", error);
        setConcessionarias([]); // Garantir que seja sempre um array
      }
    };
    fetchConcessionarias();
  }, []);

  const salvar = async (campos) => {
    try {
      //vamos enviar os dados digitados para a rota /user do backend
      const response = await api.post("automovel", campos);
      setAviso(`Cadastrado com sucesso!`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar automóvel!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar automóvel</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group mt-2">
            <label htmlFor="nome">Nome do automóvel:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              {...register("nome")}
            />
          </div>
          
          {concessionarias.length > 0 && (
            <div className="form-group mt-2">
              <label htmlFor="id_concessionaria">Concessionária:</label>
              <select
                className="form-control"
                id="id_concessionaria"
                required
                {...register("id_concessionaria")}
              >
                <option value="" selected disabled>
                  Selecione uma concessionária
                </option>
                {concessionarias.map((concessionaria) => (
                  <option
                    key={concessionaria.concessionariaId}
                    value={concessionaria.concessionariaId}
                  >
                    {concessionaria.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
                   
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

export default cadastrar_automovel;
