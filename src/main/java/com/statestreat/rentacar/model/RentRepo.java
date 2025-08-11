package com.statestreat.rentacar.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RentRepo  extends JpaRepository<Rent,Integer> {
}
