package com.statestreat.rentacar.controller;

import com.statestreat.rentacar.model.CarRepo;
import com.statestreat.rentacar.model.Rent;
import com.statestreat.rentacar.model.RentRepo;
import com.statestreat.rentacar.model.YetAnotherCar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<YetAnotherCar> getCars(){
        return carRepo.findAll();
    }

    @PostMapping
    public void setRent(int carId, Date start, Date end){
        Rent rent = new Rent();
        rent.setCarId(carId);
        rent.setRentStart(start);
        rent.setRentEnd(end);
        rentRepo.save(rent);
    }
}
