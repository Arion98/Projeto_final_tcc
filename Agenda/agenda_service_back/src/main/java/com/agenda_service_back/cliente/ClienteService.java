package com.agenda_service_back.cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {
    ClienteDTO createCliente(ClienteDTO clienteDTO);

    List<ClienteDTO> getAllClientes();

    Optional<ClienteDTO> getClienteById(Long clienteId);

    ClienteDTO updateCliente(Long clienteId, ClienteDTO clienteDTO);

    void deleteCliente(Long clienteId);
}
