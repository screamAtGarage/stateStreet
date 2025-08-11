package com.statestreat.rentacar.controller;

import com.statestreat.rentacar.model.CarRepo;
import com.statestreat.rentacar.model.Rent;
import com.statestreat.rentacar.model.RentRepo;
import com.statestreat.rentacar.model.YetAnotherCar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class RentCarController {

    @Autowired
    RentRepo rentRepo;

    @Autowired
    CarRepo carRepo;


    @GetMapping
    public List<YetAnotherCar> getCars() {
        return carRepo.findAll();
    }

    @PostMapping(value = "/{id}")
    public void setRent(@PathVariable("id") int id, @RequestBody Rent rent) {
        rent.setCarId(id);
        rentRepo.save(rent);
    }

    @GetMapping(value = "/rents")
    public List<Rent> getRents() {
        return rentRepo.findAll();
    }

}
