package com.example.demo.services;

import com.example.demo.models.LibroModel;
import com.example.demo.models.UsuarioModel;
import com.example.demo.repositories.LibroRepository;
import com.example.demo.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LibroService {

    private final LibroRepository libroRepository;
    private final UsuarioRepository usuarioRepository;

    public LibroService(LibroRepository libroRepository, UsuarioRepository usuarioRepository) {
        this.libroRepository = libroRepository;
        this.usuarioRepository = usuarioRepository;
    }
    // public Iterable<LibroModel> obtenerTodosLosLibros() {
    //     return libroRepository.findAll();
    // }

    public LibroModel guardarLibro(LibroModel libro) {
        return libroRepository.save(libro);
    }

    // public Optional<LibroModel> buscarPorId(Long id) {
    //     return libroRepository.findById(id);
    // }
public Optional<LibroModel> buscarPorId(Long id) {
        return libroRepository.findById(id).map(this::eliminarContraseñas);
    }

    public Set<LibroModel> obtenerTodosLosLibros() {
        return libroRepository.findAll().stream()
                .map(this::eliminarContraseñas)
                .collect(Collectors.toSet());
    }
    public Set<LibroModel> buscarLibrosPorTermino(String termino) {
        return libroRepository.findAll().stream()
                .filter(libro -> libro.getNombre().toLowerCase().contains(termino.toLowerCase()))
                .map(this::eliminarContraseñas)
                .collect(Collectors.toSet());
    }

    private LibroModel eliminarContraseñas(LibroModel libro) {
        libro.getUsuarios().forEach(usuario -> usuario.setContraseña(null));
        return libro;
    }
    public Optional<UsuarioModel> agregarFavorito(Long usuarioId, Long libroId) {
        Optional<UsuarioModel> usuario = usuarioRepository.findById(usuarioId);
        Optional<LibroModel> libro = libroRepository.findById(libroId);

        if (usuario.isPresent() && libro.isPresent()) {
            UsuarioModel usuarioModel = usuario.get();
            usuarioModel.getFavoritos().add(libro.get());
            usuarioRepository.save(usuarioModel);
            return Optional.of(usuarioModel);
        }
        return Optional.empty();
    }

    public Optional<Set<LibroModel>> obtenerFavoritos(Long usuarioId) {
        Optional<UsuarioModel> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(UsuarioModel::getFavoritos);
    }

}