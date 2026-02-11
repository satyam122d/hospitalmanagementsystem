package com.smartcare.hms.controller;

import com.smartcare.hms.dto.PatientRequest;
import com.smartcare.hms.entity.Appointment;
import com.smartcare.hms.entity.Patient;
import com.smartcare.hms.service.AppointmentService;
import com.smartcare.hms.service.PatientService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private final AppointmentService appointmentService;
    private final PatientService patientService;

    public PatientController(AppointmentService appointmentService ,PatientService patientService) {
        this.appointmentService = appointmentService;
        this.patientService = patientService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Patient createPatient(@RequestBody PatientRequest request) {
        return patientService.createPatient(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody PatientRequest request) {
        return patientService.updatePatient(id, request);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }

    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    @GetMapping("/{patientId}/appointments")
    public List<Appointment> getAllAppointments(
            @PathVariable Long patientId) {

        return appointmentService.getPatientAppointments(patientId);
    }

    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    @GetMapping("/{patientId}/appointments/past")
    public List<Appointment> getPastAppointments(
            @PathVariable Long patientId) {

        return appointmentService.getPastAppointments(patientId);
    }

    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    @GetMapping("/{patientId}/appointments/upcoming")
    public List<Appointment> getUpcomingAppointments(
            @PathVariable Long patientId) {

        return appointmentService.getUpcomingAppointments(patientId);
    }

}
