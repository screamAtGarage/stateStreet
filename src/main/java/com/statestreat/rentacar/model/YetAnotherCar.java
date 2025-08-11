package com.statestreat.rentacar.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "cars")
public class YetAnotherCar {

    enum Type {
        SEDAN ,
        SUV,
        VAN
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int id;

    String name;

    Type type;
}
