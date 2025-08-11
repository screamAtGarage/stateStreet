package com.statestreat.rentacar.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository <YetAnotherCar,Integer> {
}
