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
    public Appointment createAppointment(Appointment appointment) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("AUTH OBJECT = " + auth);

        String email = auth.getName(); // from JWT

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        appointment.setPatientId(user.getId());
        appointment.setStatus("BOOKED");

        boolean slotBooked =
                appointmentRepo.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                        appointment.getDoctorId(),
                        appointment.getAppointmentDate(),
                        appointment.getAppointmentTime()
                );

        if (slotBooked) {
            throw new RuntimeException("Slot already booked");
        }
        try {
            Appointment saved = appointmentRepo.save(appointment);

            String tokenNumber = "APT" + saved.getId();
            saved.setTokenNumber(tokenNumber);

            return saved ;
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("This time slot is already booked");
        }
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
