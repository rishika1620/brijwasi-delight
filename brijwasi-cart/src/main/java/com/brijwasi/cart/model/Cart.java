package com.brijwasi.cart.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String userId; // one cart per user

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_user_id")
   // @JsonManagedReference
    private List<CartItem> items;
}
