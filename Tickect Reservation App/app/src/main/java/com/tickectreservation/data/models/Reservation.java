package com.tickectreservation.data.models;

public class Reservation {
    private int id;
    private String date;
    private String fromLocation;
    private String toLocation;
    private int noOfPassengers;
    private int trainId;
    private String userId;

    public Reservation(int id, String date, String fromLocation, String toLocation, int noOfPassengers, int trainId, String userId) {
        this.id = id;
        this.date = date;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.noOfPassengers = noOfPassengers;
        this.trainId = trainId;
        this.userId = userId;
    }
}
