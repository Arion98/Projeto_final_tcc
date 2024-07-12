package com.agenda_service_back.agendamento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<AgendamentoDTO> createAgendamento(@RequestBody AgendamentoDTO agendamentoDTO) {
        System.out.println("entrou no post");
        AgendamentoDTO createdAgendamento = agendamentoService.createAgendamento(agendamentoDTO);
        System.out.println("criou o agendamento");

        return new ResponseEntity<>(createdAgendamento, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoDTO>> getAllAgendamentos() {
        List<AgendamentoDTO> agendamentos = agendamentoService.getAllAgendamentos();
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoDTO> getAgendamentoById(@PathVariable("id") Long id) {
        AgendamentoDTO agendamento = agendamentoService.getAgendamentoById(id);
        return new ResponseEntity<>(agendamento, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoDTO> updateAgendamento(
            @PathVariable("id") Long id,
            @RequestBody AgendamentoDTO agendamentoDTO
    ) {
        AgendamentoDTO updatedAgendamento = agendamentoService.updateAgendamento(id, agendamentoDTO);
        return new ResponseEntity<>(updatedAgendamento, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgendamento(@PathVariable("id") Long id) {
        agendamentoService.deleteAgendamento(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
