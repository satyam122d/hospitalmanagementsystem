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
import java.util.Arrays;
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

        String search =
                problem.toLowerCase().trim();

        List<Doctor> doctors =
                doctorRepo.findAll();

        // STEP 1: Exact/full phrase match
        List<Doctor> exactMatches = doctors.stream()

                .filter(doctor ->

                        doctor.getKeywords().stream()

                                .anyMatch(keyword ->

                                        keyword.toLowerCase()

                                                .contains(search)

                                )

                )

                .collect(Collectors.toList());
        if (!exactMatches.isEmpty()) {

            return exactMatches;
        }
        return doctors.stream()

                .filter(doctor ->

                        doctor.getKeywords().stream()

                                .anyMatch(keyword -> {

                                    String lowerKeyword =
                                            keyword.toLowerCase();

                                    return Arrays.stream(
                                                    search.split(" ")
                                            )

                                            .filter(word ->
                                                    word.length() > 3
                                            )

                                            .anyMatch(word ->

                                                    lowerKeyword.contains(
                                                            word.toLowerCase()
                                                    )

                                            );

                                })

                )

                .collect(Collectors.toList());

    }
    public List<String> getSuggestions(String keyword) {

        List<String> suggestions = Arrays.asList(

                "chest pain",
                "heart palpitations",
                "high blood pressure",
                "shortness of breath",
                "irregular heartbeat",
                "heart checkup",

                "skin rash",
                "skin allergy",
                "acne treatment",
                "itching problem",
                "hair fall",
                "dry skin",

                "migraine",
                "headache",
                "dizziness",
                "nerve pain",
                "memory problem",
                "seizure symptoms",

                "bone fracture",
                "joint pain",
                "knee pain",
                "back pain",
                "shoulder injury",
                "muscle pain",

                "child fever",
                "baby vaccination",
                "child cough",
                "pediatric consultation",
                "child weakness",
                "newborn checkup",

                "eye pain",
                "blurred vision",
                "eye redness",
                "vision problem",
                "dry eyes",
                "eye irritation",

                "pregnancy consultation",
                "menstrual pain",
                "pcos symptoms",
                "hormonal issues",
                "women health checkup",
                "pregnancy care",

                "ear pain",
                "throat infection",
                "sinus problem",
                "hearing issue",
                "nose blockage",
                "tonsil pain",

                "anxiety",
                "stress",
                "depression symptoms",
                "sleep disorder",
                "panic attacks",
                "mental health consultation",

                "urine infection",
                "kidney stone",
                "frequent urination",
                "bladder problem",
                "pain while urinating",
                "urology consultation",

                "diabetes checkup",
                "thyroid problem",
                "hormonal imbalance",
                "weight gain",
                "fatigue",
                "sugar level check",

                "fever",
                "body weakness",
                "cold and cough",
                "viral infection",
                "stomach pain",
                "general consultation"

        );

        return suggestions.stream()

                .filter(item ->
                        item.toLowerCase()
                                .contains(keyword.toLowerCase())
                )

                .limit(5)

                .collect(Collectors.toList());

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
    public Doctor getDoctorById(Long id) {

        return doctorRepo.findById(id)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor not found"
                        )
                );

    }
}
