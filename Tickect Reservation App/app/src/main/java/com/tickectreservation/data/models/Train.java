package com.tickectreservation.data.models;

import java.util.List;

public class Train {
    private int trainId;
    private String trainName;
    private Schedule schedule;
    private String status;
    private List<String> reservations;
}
