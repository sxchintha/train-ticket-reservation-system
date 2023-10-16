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

    public Reservation(String trainID, String nic, String trainName, String sheduledate, String sheduletime, String fromStation, String toStation, String quentity, String price, String createdDate, String id) {
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
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrainID() {
        return trainID;
    }

    public void setTrainID(String trainID) {
        this.trainID = trainID;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getSheduledate() {
        return sheduledate;
    }

    public void setSheduledate(String sheduledate) {
        this.sheduledate = sheduledate;
    }

    public String getSheduletime() {
        return sheduletime;
    }

    public void setSheduletime(String sheduletime) {
        this.sheduletime = sheduletime;
    }

    public String getFromStation() {
        return fromStation;
    }

    public void setFromStation(String fromStation) {
        this.fromStation = fromStation;
    }

    public String getToStation() {
        return toStation;
    }

    public void setToStation(String toStation) {
        this.toStation = toStation;
    }

    public String getQuentity() {
        return quentity;
    }

    public void setQuentity(String quentity) {
        this.quentity = quentity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}
