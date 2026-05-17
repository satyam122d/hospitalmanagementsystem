package com.smartcare.hms.controller;

import com.smartcare.hms.entity.Appointment;
import com.smartcare.hms.entity.User;
import com.smartcare.hms.enums.AppointmentStatus;
import com.smartcare.hms.repository.AppointmentRepo;
import com.smartcare.hms.repository.UserRepo;
import com.smartcare.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    @Autowired
    private AppointmentRepo appointmentRepo;
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @Autowired
    private UserRepo userRepo;

    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT')")
    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        try {
            return ResponseEntity.ok(
                    appointmentService.createAppointment(appointment)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT', 'DOCTOR')")
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {
        return appointmentService.updateAppointment(id, appointment);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{appointmentId}/assign-doctor/{doctorId}")
    public Appointment assignDoctor(
            @PathVariable Long appointmentId,
            @PathVariable Long doctorId) {

        return appointmentService.assignDoctor(appointmentId, doctorId);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @PutMapping("/status/{id}")
    public Appointment updateStatus(@PathVariable Long id,
                                    @RequestParam AppointmentStatus status) {
        return appointmentService.updateAppointmentStatus(id, status);
    }
    @GetMapping("/status/{tokenNumber}")
    public Appointment getAppointmentStatus(@PathVariable String tokenNumber) {
        return appointmentService.getAppointmentByToken(tokenNumber);
    }
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(
            @PathVariable Long patientId) {
        return appointmentRepo.findByPatientId(patientId);
    }
    @GetMapping("/my")
    @PreAuthorize("hasRole('PATIENT')")
    public List<Appointment> getMyAppointments(
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User user) {

        String email = user.getUsername(); // from JWT

        User loggedInUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long patientId = loggedInUser.getId();

        return appointmentRepo.findByPatientId(patientId);
    }

}
