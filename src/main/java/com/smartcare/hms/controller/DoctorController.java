package com.smartcare.hms.controller;

import com.smartcare.hms.entity.Doctor;
import com.smartcare.hms.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping()
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String problem) {
        return doctorService.searchDoctorsByProblem(problem);
    }
    @GetMapping("/{doctorId}/available-dates")
    public List<LocalDate> getAvailableDates(@PathVariable Long doctorId) {
        return doctorService.getAvailableDates(doctorId);
    }
    @GetMapping("/{doctorId}/available-slots")
    public List<LocalTime> getAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam LocalDate date
    ) {
        return doctorService.getAvailableTimeSlots(doctorId, date);
    }
    @GetMapping("/suggestions")
    public List<String> getSuggestions(
            @RequestParam String keyword
    ) {

        return doctorService
                .getSuggestions(keyword);

    }
    @GetMapping("/{id}/reasons")
    public List<String> getReasons(
            @PathVariable Long id
    ){

        Doctor doctor =
                doctorService.getDoctorById(id);

        return doctor.getReasons();
    }
}
