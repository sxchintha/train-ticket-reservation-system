package com.tickectreservation.data.models;

import java.util.List;

public class Train {
    private String trainID;
    private String trainName;
    private double pricePerKM;
    private double pricePerTicket;
    private int availableSeats;
    private Schedule schedule;
    private String status;
    private List<String> reservations;

    public Train(String trainID, String trainName, double pricePerKM, double pricePerTicket, int availableSeats, Schedule schedule, String status, List<String> reservations) {
        this.trainID = trainID;
        this.trainName = trainName;
        this.pricePerKM = pricePerKM;
        this.pricePerTicket = pricePerTicket;
        this.availableSeats = availableSeats;
        this.schedule = schedule;
        this.status = status;
        this.reservations = reservations;
    }

    public String getTrainId() {
        return trainID;
    }

    public void setTrainId(String trainID) {
        this.trainID = trainID;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public double getPricePerKM() {
        return pricePerKM;
    }

    public void setPricePerKM(double pricePerKM) {
        this.pricePerKM = pricePerKM;
    }

    public double getPricePerTicket() {
        return pricePerTicket;
    }

    public void setPricePerTicket(double pricePerTicket) {
        this.pricePerTicket = pricePerTicket;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getReservations() {
        return reservations;
    }

    public void setReservations(List<String> reservations) {
        this.reservations = reservations;
    }
}
