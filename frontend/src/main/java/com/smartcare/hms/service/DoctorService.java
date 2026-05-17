package com.smartcare.hms.service;

import com.smartcare.hms.entity.Appointment;
import com.smartcare.hms.entity.Doctor;
import com.smartcare.hms.entity.DoctorAvailability;
import com.smartcare.hms.repository.AppointmentRepo;
import com.smartcare.hms.repository.DoctorAvailabilityRepo;
import com.smartcare.hms.repository.DoctorRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepo doctorRepo;
    private DoctorAvailabilityRepo availabilityRepo = null;
    private final AppointmentRepo appointmentRepo;


    public DoctorService(DoctorRepo doctorRepo , DoctorAvailabilityRepo availabilityRepo,AppointmentRepo appointmentRepo ) {
        this.doctorRepo = doctorRepo;
        this.availabilityRepo = availabilityRepo;
        this.appointmentRepo =appointmentRepo;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }
    public List<Doctor> searchDoctorsByProblem(String problem) {

        String specialization;

        String p = problem.toLowerCase();

        if (p.contains("fever") || p.contains("cold")) {
            specialization = "General Physician";
        } else if (p.contains("heart") || p.contains("chest")) {
            specialization = "Cardiologist";
        } else {
            specialization = "General Physician";
        }

        return doctorRepo.findBySpecializationIgnoreCase(specialization);
    }
    public List<LocalDate> getAvailableDates(Long doctorId) {
        return availabilityRepo.findByDoctorId(doctorId)
                .stream()
                .map(DoctorAvailability::getAvailableDate)
                .toList();
    }

    public List<LocalTime> getAvailableTimeSlots(Long doctorId, LocalDate date) {

        boolean isDateAvailable = availabilityRepo
                .findByDoctorId(doctorId)
                .stream()
                .anyMatch(a -> a.getAvailableDate().equals(date));

        if (!isDateAvailable) {
            return List.of();
        }

        // working hours
        LocalTime start = LocalTime.of(10, 0);
        LocalTime end = LocalTime.of(13, 0);
        int slotMinutes = 30;

        List<Appointment> booked =
                appointmentRepo.findByDoctorIdAndAppointmentDate(doctorId, date);

        Set<LocalTime> bookedTimes = booked.stream()
                .map(Appointment::getAppointmentTime)
                .collect(Collectors.toSet());

        List<LocalTime> slots = new ArrayList<>();

        while (start.isBefore(end)) {
            if (!bookedTimes.contains(start)) {
                slots.add(start);
            }
            start = start.plusMinutes(slotMinutes);
        }

        return slots;
    }

}
