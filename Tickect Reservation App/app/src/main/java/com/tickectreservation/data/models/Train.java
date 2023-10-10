package com.tickectreservation.data.models;

import java.util.List;

public class Train {
    private int trainId;
    private String trainName;
    private Schedule schedule;
    private String status;
    private List<String> reservations;

    public Train(int trainId, String trainName, Schedule schedule, String status, List<String> reservations) {
        this.trainId = trainId;
        this.trainName = trainName;
        this.schedule = schedule;
        this.status = status;
        this.reservations = reservations;
    }

    public int getTrainId() {
        return trainId;
    }

    public void setTrainId(int trainId) {
        this.trainId = trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
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
