package com.example.demo.models;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name="libro")
public class LibroModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_libro;
//agregar titulo,autor y imagen, descripcion
    private String nombre;
    @JsonProperty("titulo")
    private String title;
    @JsonProperty("autor")
    private String authors;
    @JsonProperty("imagen")
    private String previewLink;
    @JsonProperty("descripcion")
    private String description;
    private String genero;
    private Integer calificacion;
    private Integer año;
    private Integer estrellas;

    @ManyToMany(mappedBy = "favoritos")
    @JsonIgnoreProperties("favoritos")
    private Set<UsuarioModel> usuarios = new HashSet<>();

    // Getters y setters

    public Long getId_libro() {
        return id_libro;
    }

    public void setId_libro(Long id_libro) {
        this.id_libro = id_libro;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getPreviewLink() {
        return previewLink;
    }

    public void setPreviewLink(String previewLink) {
        this.previewLink = previewLink;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Integer calificacion) {
        this.calificacion = calificacion;
    }

    public Integer getAño() {
        return año;
    }

    public void setAño(Integer año) {
        this.año = año;
    }

    public Integer getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(Integer estrellas) {
        this.estrellas = estrellas;
    }

    public Set<UsuarioModel> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<UsuarioModel> usuarios) {
        this.usuarios = usuarios;
    }
}