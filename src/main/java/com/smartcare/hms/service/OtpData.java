package com.smartcare.hms.service;

public class OtpData {
    private String otp;
    private long createdTime;

    public OtpData(String otp, long createdTime) {
        this.otp = otp;
        this.createdTime = createdTime;
    }

    public String getOtp() {
        return otp;
    }

    public long getCreatedTime() {
        return createdTime;
    }
}
