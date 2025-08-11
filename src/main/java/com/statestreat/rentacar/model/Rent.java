package com.statestreat.rentacar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


import java.util.Date;

@Data
@Entity
public class Rent {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int rentId;

    int carId;
    Date rentStart;
    Date rentEnd;

}
