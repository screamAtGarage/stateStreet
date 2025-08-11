package com.statestreat.rentacar.controller;

import com.statestreat.rentacar.model.CarRepo;
import com.statestreat.rentacar.model.Rent;
import com.statestreat.rentacar.model.RentRepo;
import com.statestreat.rentacar.model.YetAnotherCar;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Date;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

    @WebMvcTest(RentCarController.class)
    public class RentCarControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private RentRepo rentRepo;

        @MockBean
        private CarRepo carRepo;

        private YetAnotherCar testCar;
        private Rent testRent;

        @BeforeEach
        void setup() {
            testCar = new YetAnotherCar();
            testCar.setId(1);
            testCar.setName("Test Car");
            // set other fields as needed

            testRent = new Rent();
            testRent.setName("John Doe");
            testRent.setStartDate(new Date());
            testRent.setDays(3);
        }

        @Test
        void testGetCars() throws Exception {
            when(carRepo.findAll()).thenReturn(Collections.singletonList(testCar));

            mockMvc.perform(get("/cars"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(1)))
                    .andExpect(jsonPath("$[0].name").value("Test Car"));

            verify(carRepo, times(1)).findAll();
        }

        @Test
        void testGetRents() throws Exception {
            when(rentRepo.findAll()).thenReturn(Collections.singletonList(testRent));

            mockMvc.perform(get("/cars/rents"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(1)))
                    .andExpect(jsonPath("$[0].name").value("John Doe"));

            verify(rentRepo, times(1)).findAll();
        }

        @Test
        void testSetRent() throws Exception {
            String rentJson = """
                    {
                      "name": "John Doe",
                      "startDate": "2025-08-11",
                      "days": 3
                    }
                    """;

            mockMvc.perform(post("/cars/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(rentJson))
                    .andExpect(status().isOk());

            ArgumentCaptor<Rent> rentCaptor = ArgumentCaptor.forClass(Rent.class);
            verify(rentRepo, times(1)).save(rentCaptor.capture());

            Rent savedRent = rentCaptor.getValue();
            assert savedRent.getCarId() == 1;
            assert "John Doe".equals(savedRent.getName());

            assert savedRent.getDays() == 3;
        }

    }
