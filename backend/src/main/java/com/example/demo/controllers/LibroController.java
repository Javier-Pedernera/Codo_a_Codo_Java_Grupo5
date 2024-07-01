package com.example.demo.controllers;

import com.example.demo.models.LibroModel;
import com.example.demo.models.UsuarioModel;
import com.example.demo.services.LibroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/libros")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }
    //obtener todos los libros
    @GetMapping
    public ResponseEntity<Iterable<LibroModel>> obtenerTodosLosLibros() {
        Iterable<LibroModel> libros = libroService.obtenerTodosLosLibros();
        return ResponseEntity.ok(libros);
    }
    // Endpoint para crear un libro nuevo
    @PostMapping
    public ResponseEntity<LibroModel> crearLibro(@RequestBody LibroModel libro) {
        LibroModel libroGuardado = libroService.guardarLibro(libro);
        return ResponseEntity.ok(libroGuardado);
    }

    // Endpoint para obtener un libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<LibroModel> obtenerLibroPorId(@PathVariable Long id) {
        Optional<LibroModel> libro = libroService.buscarPorId(id);
        return libro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para agregar un libro a los favoritos de un usuario
    @PostMapping("/{libroId}/favorito/{usuarioId}")
    public ResponseEntity<UsuarioModel> agregarFavorito(@PathVariable Long usuarioId, @PathVariable Long libroId) {
        Optional<UsuarioModel> usuario = libroService.agregarFavorito(usuarioId, libroId);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para eliminar un libro de los favoritos de un usuario
    @DeleteMapping("/{libroId}/favorito/{usuarioId}")
    public ResponseEntity<UsuarioModel> eliminarFavorito(@PathVariable Long usuarioId, @PathVariable Long libroId) {
        Optional<UsuarioModel> usuario = libroService.eliminarFavorito(usuarioId, libroId);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para obtener los libros favoritos de un usuario
    @GetMapping("/favoritos/{usuarioId}")
    public ResponseEntity<Set<LibroModel>> obtenerFavoritos(@PathVariable Long usuarioId) {
        Optional<Set<LibroModel>> favoritos = libroService.obtenerFavoritos(usuarioId);
        return favoritos.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}