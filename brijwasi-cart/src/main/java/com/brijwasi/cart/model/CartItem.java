package com.brijwasi.cart.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Data
public class CartItem implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long menuItemId;
    private Integer quantity;
    private Double price;
//    @ManyToOne
//    @JoinColumn(name = "cart_id")
//    @JsonBackReference
//    private Cart cart;
}
