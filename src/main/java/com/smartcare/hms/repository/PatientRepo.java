package com.smartcare.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartcare.hms.entity.Patient;
public interface PatientRepo extends JpaRepository<Patient, Long> {

}
