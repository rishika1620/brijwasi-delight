package com.brijwasi.menu.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AddOn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    private String url;
}
