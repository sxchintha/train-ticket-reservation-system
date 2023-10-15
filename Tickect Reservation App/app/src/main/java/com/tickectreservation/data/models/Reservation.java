package com.tickectreservation.data.models;

public class Reservation {
    private String id;
    private String trainID;
    private String nic;
    private String trainName;
    private String sheduledate;
    private String sheduletime;
    private String fromStation;
    private String toStation;
    private String quentity;
    private String price;
    private String createdDate;

    public Reservation(String trainID, String nic, String trainName, String sheduledate, String sheduletime, String fromStation, String toStation, String quentity, String price, String createdDate) {
        this.trainID = trainID;
        this.nic = nic;
        this.trainName = trainName;
        this.sheduledate = sheduledate;
        this.sheduletime = sheduletime;
        this.fromStation = fromStation;
        this.toStation = toStation;
        this.quentity = quentity;
        this.price = price;
        this.createdDate = createdDate;
    }
}
