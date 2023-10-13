package com.tickectreservation.data.models;

public class LoginRequest {
    private String nic;
    private String password;

    public LoginRequest(String nic, String password) {
        this.nic = nic;
        this.password = password;
    }
}
