package com.tickectreservation.data.models;

public class User {
    private String firstName;
    private String lastName;
    private String email;
    private String nic;
    private String phone;

    private String password;

    public User(String firstName, String lastName, String email, String nic, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.nic = nic;
        this.phone = phone;
    }

    public User(String firstName, String lastName, String email, String nic, String phone, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.nic = nic;
        this.phone = phone;
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
