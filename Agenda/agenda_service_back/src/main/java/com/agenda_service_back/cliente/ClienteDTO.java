package com.agenda_service_back.cliente;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.agenda_service_back.endereco.EnderecoDTO;
import com.agenda_service_back.telefone.TelefoneDTO;
import com.agenda_service_back.agendamento.AgendamentoDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO implements Serializable {
    private Long cliente_id;
    private String cliente_nome;
    private String cliente_cpf;
    private String email;
    private String cliente_senha;
    private LocalDate cliente_dataNascimento;
    private EnderecoDTO endereco;
    private List<TelefoneDTO> telefone;
    private List<AgendamentoDTO> agendamento;

    @Override
    public String toString() {
        return "{" +
            " cliente_id='" + getCliente_id() + "'" +
            ", cliente_nome='" + getCliente_nome() + "'" +
            ", cliente_cpf='" + getCliente_cpf() + "'" +
            ", email='" + getEmail() + "'" +
            ", cliente_senha='" + getCliente_senha() + "'" +
            ", cliente_dataNascimento='" + getCliente_dataNascimento() + "'" +
            "}";
    }


}
