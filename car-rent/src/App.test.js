
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("loads cars and bookings, submits booking form", async () => {
  // Mock car list response
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "Car One", type: "SEDAN" },
        { id: 2, name: "Car Two", type: "VAN" },
      ],
    })
    // Mock bookings response
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { carId: 1, name: "Alice", startDate: "2025-08-11", days: 2 },
      ],
    })
    // Mock booking POST response
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Booked successfully" }),
    });

  render(<App />);

  // Wait for cars to appear
  await waitFor(() => screen.getByText("Car One"));

  // Select the second car radio button
  const radios = screen.getAllByRole("radio");  // get all radios
  fireEvent.click(radios[1]);

  // Fill booking form fields
  fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "Bob" } });
  fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: "08/12/2025" } });
  fireEvent.change(screen.getByLabelText(/days/i ), { target: { value: "3" } });

  // Submit form
  fireEvent.click(screen.getByRole("button", { name: /book selected car/i }));

  // Wait for booking success message
  await waitFor(() => screen.getByText(/booking successful/i));

});
