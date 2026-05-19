package com.smartcare.hms.service;

import com.smartcare.hms.dto.PatientRequest;
import com.smartcare.hms.entity.Patient;
import com.smartcare.hms.repository.PatientRepo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepo patientRepo;

    public PatientService(PatientRepo patientRepo) {
        this.patientRepo = patientRepo;
    }

    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    public Patient createPatient(PatientRequest request) {
        Patient patient = new Patient();
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        return patientRepo.save(patient);
    }
    public Patient updatePatient(Long id, PatientRequest request) {
        Patient existing = patientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        existing.setName(request.getName());
        existing.setAge(request.getAge());
        existing.setGender(request.getGender());

        return patientRepo.save(existing);
    }
    public Patient getPatientById(Long id) {
        return patientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
    public void deletePatient(Long id) {
        patientRepo.deleteById(id);
    }

}
