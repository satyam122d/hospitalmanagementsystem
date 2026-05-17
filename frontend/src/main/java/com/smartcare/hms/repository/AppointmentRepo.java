package com.smartcare.hms.repository;

import com.smartcare.hms.entity.Appointment;
import com.smartcare.hms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepo extends JpaRepository<Appointment , Long> {
    Optional<Appointment> findByTokenNumber(String tokenNumber);
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByPatientIdAndAppointmentDateAfter(
            Long patientId, LocalDate date);

    List<Appointment> findByPatientIdAndAppointmentDateBefore(
            Long patientId, LocalDate date
    );
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, LocalDate appointmentDate);

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime
    );
}
