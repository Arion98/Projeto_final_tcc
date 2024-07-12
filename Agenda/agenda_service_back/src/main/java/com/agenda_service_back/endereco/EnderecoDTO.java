package com.agenda_service_back.endereco;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import java.util.List;

import com.agenda_service_back.cliente.ClienteDTO;
import com.agenda_service_back.prestador.PrestadorDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnderecoDTO implements Serializable {
    private Long endereco_id;
    private String endereco_rua;
    private String endereco_cep;
    private Number endereco_numero;
    private String endereco_complemento;
    private String endereco_cidade;
    private String endereco_estado;
    private String endereco_bairro;

    private List<ClienteDTO> cliente;
    private List<PrestadorDTO> prestador;

    @Override
    public String toString() {
        return "{" +
            " endereco_id='" + getEndereco_id() + "'" +
            ", endereco_rua='" + getEndereco_rua() + "'" +
            ", endereco_cep='" + getEndereco_cep() + "'" +
            ", endereco_numero='" + getEndereco_numero() + "'" +
            ", endereco_complemento='" + getEndereco_complemento() + "'" +
            ", endereco_cidade='" + getEndereco_cidade() + "'" +
            ", endereco_estado='" + getEndereco_estado() + "'" +
            ", endereco_bairro='" + getEndereco_bairro() + "'" +
            
            "}";
    }


}
