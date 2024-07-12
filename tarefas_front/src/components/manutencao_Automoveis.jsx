import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const Manutencao_Automoveis = () => {
    const { register, handleSubmit, reset } = useForm();
    const [automoveis, setAutomoveis] = useState([]);
    const [idConcessionaria, setIdConcessionaria] = useState(''); 

    const obterLista = async () => {
        const concessionariaId = localStorage.getItem('concessionaria_id');
        console.log(`Concessionaria ID: ${concessionariaId}`);
        if (!concessionariaId) {
            alert("ID da concessionária não encontrado no localStorage");
            return;
        }

        try {
            const lista = await api.get(`automovel/${concessionariaId}`);
            setAutomoveis(lista.data.automovel);
        } catch (error) {
            console.error("Erro ao obter a lista de automóveis:", error);
            alert(`Erro: Não foi possível obter os dados: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        const storedId = localStorage.getItem('concessionaria_id');
        if (storedId) {
            setIdConcessionaria(storedId);
            obterLista();
        } else {
            alert("ID da concessionária não encontrado no localStorage");
        }
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`automovel/filtro/${campos.palavra}`);
            lista.data.length ? setAutomoveis(lista.data) : alert("Não há automóveis cadastrados com a palavra chave pesquisada");
        } catch (error) {
            console.error("Erro ao filtrar a lista de automóveis:", error);
            alert(`Erro: Não foi possível obter os dados: ${error.response?.data?.message || error.message}`);
        }
    };

    const excluir = async (id, nome) => {
        if (!window.confirm(`Confirma a exclusão do Automóvel ${nome}?`)) {
            return;
        }
        try {
            await api.delete(`automovel/${id}`);
            setAutomoveis(automoveis.filter(automovel => automovel.id !== id));
        } catch (error) {
            console.error("Erro ao excluir o automóvel:", error);
            alert(`Erro: Não foi possível excluir o automóvel ${nome}: ${error.response?.data?.message || error.message}`);
        }
    };

    const alterar = async (id, nome) => {
        const novoNome = prompt(`Digite o novo nome do automóvel ${nome}`);
        if (novoNome === "") {
            alert('Digite um nome válido!(nome em branco)');
            return;
        }
        try {
            await api.put(`automovel/${id}`, { nome: novoNome });
            const automoveisAtualizados = [...automoveis];
            const index = automoveisAtualizados.findIndex(automovel => automovel.id === id);
            automoveisAtualizados[index].nome = novoNome;
            setAutomoveis(automoveisAtualizados);
            obterLista();
        } catch (error) {
            console.error("Erro ao alterar o automóvel:", error);
            alert(`Erro: Não foi possível alterar o automóvel ${nome}: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção de Automóveis</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Nome" required {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {automoveis.map((automovel) => (
                        <ItemLista
                            key={automovel.id}
                            id={automovel.id}
                            nome={automovel.nome}
                            excluirClick={() => excluir(automovel.id, automovel.nome)}
                            alterarClick={() => alterar(automovel.id, automovel.nome)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manutencao_Automoveis;
