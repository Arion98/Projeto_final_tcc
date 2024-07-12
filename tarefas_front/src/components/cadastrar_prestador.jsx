import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

const Cadastrar_prestador = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [success, setSuccess] = useState(false);
  const [endereco, setEndereco] = useState([]);


  useEffect(() => {
    const fetchEndereco = async () => {
      try {
        const response = await api.get("/endereco");
        setEndereco(response.data || []); // Ajustado para garantir que seja um array
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        setEndereco([]); // Garantir que seja sempre um array
      }
    };
    fetchEndereco();
  }, []);

  const salvar = async (campos) => {
    try {
      // Cadastrar o cliente primeiro
      const responsePrestador = await api.post("prestador", {
        prestador_nome: campos.prestador_nome,
        prestador_cnpj: campos.prestador_cnpj,
        prestador_cpf: campos.prestador_cpf,
        prestador_razaoSocial: campos.prestador_razaoSocial,
        prestador_email: campos.prestador_email,
        prestador_senha: campos.prestador_senha,
        
      });

      const prestadorId = responsePrestador.data.prestador_id; // Supondo que a resposta do servidor inclui o ID do cliente
      console.log(prestadorId);
      // Cadastrar o telefone do cliente
      await api.post("telefone", {
        prestador:{
          prestador_id: prestadorId
        },
          telefone_numero: campos.telefone_numero,
      });

      setAviso("Usuário e telefone cadastrados com sucesso!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); 
      }, 5000);
    } catch (error) {
      setAviso("Dados inválidos, tente novamente!");
      reset()
    }
  };

  return (
    <><Helmet>
      <title>Cadastro de Prestadores</title>
    </Helmet>
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center"> 
        <div className="container p-5 bg-light text-dark rounded">
          <h4 className="fst-italic mb-3">Preencha os campos para se cadastrar</h4>
          <form onSubmit={handleSubmit(salvar)}>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_nome">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_nome"
                  required
                  autoFocus
                  {...register("prestador_nome")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_cnpj">CNPJ:</label>
                 <InputMask
                  mask="99.999.999/9999-99"
                  type="text"
                  className="form-control"
                  id="prestador_cnpj"
                  autoFocus
                  {...register("prestador_cnpj")}
                  />
              </div>
              <div className="col">
                <label htmlFor="prestador_cpf">CPF:</label>
                <InputMask
                  mask="999.999.999-99"
                  type="text"
                  className="form-control"
                  id="prestador_cpf"
                  required
                  autoFocus
                  {...register("prestador_cpf")}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="telefone">Telefone:</label>
                <InputMask
                  mask="(99) 99999-9999"
                  type="text"
                  className="form-control"
                  id="telefone"
                  required
                  autoFocus
                  {...register("telefone_numero")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestadorEmail">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="prestadorEmail"
                  required
                  {...register("prestadorEmail")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_razaoSocial">Razão Social:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_razaoSocial"
                  
                  {...register("prestador_razaoSocial")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_senha">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="prestador_senha"
                  required
                  {...register("prestador_senha")}
                />
              </div>
              {endereco.length > 0 && (
            <div className="form-group mt-2">
              <label htmlFor="endereco_id">Endereço:</label>
              <select
                className="form-control"
                id="endereco_id"
                required
                reset
                {...register("endereco_id")}
              >
                <option value="" selected disabled>
                  Selecione um endereço
                </option>
                {endereco.map((enderecos) => (
                  <option
                    key={enderecos.endereco_id}
                    value={enderecos.endereco_id}
                  >
                    {enderecos.endereco_cep}
                  </option>
                ))}
              </select>
            </div>
          )}
            
            </div>
            <input
              type="submit"
              className="btn btn-primary mt-3"
              value="Cadastrar"
            />
            <Link to="/">
            <input
              type="reset"
              className="btn btn-danger mt-3 ms-3"
              value="Cancelar"
            />
            </Link>
          </form>
          {aviso && (
          <div
            className={`alert mt-3 ${
              success ? "alert-success" : "alert-danger"
            }`}
          >
            {aviso}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Cadastrar_prestador;