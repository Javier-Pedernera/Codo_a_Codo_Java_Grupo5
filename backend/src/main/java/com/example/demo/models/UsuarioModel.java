package com.example.demo.models;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name="usuario")
public class UsuarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    private String email;
    private String contraseña;

    @ManyToMany
    @JoinTable(
        name = "usuario_libro_favorito",
        joinColumns = @JoinColumn(name = "id_usuario"),
        inverseJoinColumns = @JoinColumn(name = "id_libro")
    )
    private Set<LibroModel> favoritos = new HashSet<>();

    // Getters y setters

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public Set<LibroModel> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Set<LibroModel> favoritos) {
        this.favoritos = favoritos;
    }
}