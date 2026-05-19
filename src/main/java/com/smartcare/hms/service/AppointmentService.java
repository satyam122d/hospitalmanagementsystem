package com.smartcare.hms.service;

import com.smartcare.hms.entity.Appointment;
import com.smartcare.hms.entity.User;
import com.smartcare.hms.enums.AppointmentStatus;
import com.smartcare.hms.repository.AppointmentRepo;
import com.smartcare.hms.repository.DoctorRepo;
import com.smartcare.hms.repository.UserRepo;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;
    private final DoctorRepo doctorRepo;
    private final UserRepo userRepo;

    public AppointmentService(AppointmentRepo appointmentRepo , DoctorRepo doctorRepo,  UserRepo userRepo) {
        this.appointmentRepo = appointmentRepo;
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;

    }
    @Transactional
<<<<<<< HEAD
    public Appointment createAppointment(
            Appointment appointment,
            String doctorName
    ) {
=======
    public Appointment createAppointment(Appointment appointment, String doctorName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("AUTH OBJECT = " + auth);
>>>>>>> 433fb6fa1e9f9055837c0c0f5d2122461eaa1101

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                auth.getName();

        User user =
                userRepo.findByEmail(email)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        appointment.setPatientId(
                user.getId()
        );
        appointment.setPatientName(
                user.getName()
        );

        appointment.setStatus(
                "BOOKED"
        );

        String doctorNameFromDb =
                doctorRepo.findById(
                                appointment.getDoctorId()
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Doctor not found"
                                )
                        )

                        .getName();

        appointment.setDoctorName(
                doctorNameFromDb
        );

        appointment.setDoctorName(doctorName);

        boolean slotBooked =
                appointmentRepo
                        .existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                                appointment.getDoctorId(),
                                appointment.getAppointmentDate(),
                                appointment.getAppointmentTime()
                        );

        if(slotBooked){

            throw new RuntimeException(
                    "Slot already booked"
            );

        }

        Appointment saved =
                appointmentRepo.save(appointment);
        String tokenNumber =
                "APT" + saved.getId();
        saved.setTokenNumber(tokenNumber);
        saved = appointmentRepo.save(saved);

        return saved;

    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, Appointment updated) {
        Appointment existing = getAppointmentById(id);

        existing.setAppointmentDate(updated.getAppointmentDate());
        existing.setStatus(updated.getStatus());

        return appointmentRepo.save(existing);
    }

    public void deleteAppointment(Long id) {
        appointmentRepo.deleteById(id);
    }
    public Appointment assignDoctor(Long appointmentId, Long doctorId) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setDoctorId(doctorId);

        return appointmentRepo.save(appointment);
    }

    public List<Appointment> getDoctorTodayAppointments(Long doctorId) {

        return appointmentRepo.findByDoctorIdAndAppointmentDate(
                doctorId,
                LocalDate.now()
        );
    }

    public Appointment updateAppointmentStatus(Long appointmentId,
                                               AppointmentStatus status) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status.name());
        return appointmentRepo.save(appointment);
    }

    public List<Appointment> getPatientAppointments(Long patientId) {
        return appointmentRepo.findByPatientId(patientId);
    }

    public List<Appointment> getPastAppointments(Long patientId) {
        return appointmentRepo.findByPatientIdAndAppointmentDateBefore(
                patientId, LocalDate.now()
        );
    }

    public List<Appointment> getUpcomingAppointments(Long patientId) {
        return appointmentRepo.findByPatientIdAndAppointmentDateAfter(
                patientId, LocalDate.now()
        );
    }
    public Appointment getAppointmentByToken(String tokenNumber) {

        return appointmentRepo.findByTokenNumber(tokenNumber)
                .orElseThrow(() -> new RuntimeException("Invalid token number"));
    }

}
