package com.brijwasi.menu.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    private Double price;
    private String url;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "category_id", nullable = false)
//    @JsonIgnoreProperties({"menuItems"})
//    private Category category;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "menuitem_addon",
            joinColumns = @JoinColumn(name = "menuitem_id"),
            inverseJoinColumns = @JoinColumn(name = "addon_id"))
    private List<AddOn> addOns;
}
