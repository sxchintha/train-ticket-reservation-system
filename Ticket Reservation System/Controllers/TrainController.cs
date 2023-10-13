using Microsoft.AspNetCore.Mvc;
using Ticket_Reservation_System.Dtos;
using Ticket_Reservation_System.Models;
using Ticket_Reservation_System.Services;


namespace Ticket_Reservation_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly TrainService _trainService;

        public TrainController(TrainService trainService)
        {
            _trainService = trainService;
        }

        [HttpPost]
        public async Task<ActionResult<Train>> CreateTrain(Train train)
        {
            try
            {
                var newTrain = new Train
                {
                    TrainID = train.TrainID,
                    TrainName = train.TrainName,
                    PricePerKM = train.PricePerKM,
                    AvailableSeats = train.AvailableSeats,
                    Schedule = new Schedule
                    {
                        DepartureTime = train.Schedule.DepartureTime,
                        ArrivalTime = train.Schedule.ArrivalTime,
                        StationDistances = train.Schedule.StationDistances
                    },
                    Status = train.Status,
                    Reservations = train.Reservations
                };

                await _trainService.CreateAsync(newTrain);
                return CreatedAtAction(nameof(GetTrainById), new { id = newTrain.Id }, newTrain);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // PUT: api/trains/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Train>> UpdateTrain(string id, Train updatedTrain)
        {
            try
            {
                var train = await _trainService.UpdateAsync(id, updatedTrain);
                if (train == null)
                {
                    return NotFound();
                }
                return Ok(train);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PATCH: api/trains/cancel/{id}
        [HttpPatch("cancel/{id}")]
        public async Task<ActionResult<Train>> CancelTrain(string id)
        {
            try
            {
                var train = await _trainService.CancelTrainAsync(id);
                if (train == null)
                {
                    return NotFound();
                }
                return Ok(train);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "An error occurred while cancelling the train." });
            }
        }

        // GET: api/trains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Train>>> GetTrains()
        {
            try
            {
                var trains = await _trainService.GetAllTrainsAsync();
                return Ok(trains);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrainById(string id)
        {
            try
            {
                var train = await _trainService.GetTrainByIdAsync(id);
                if (train == null)
                {
                    return NotFound();
                }
                return Ok(train);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPatch("publish/{id}")]
        public async Task<ActionResult<Train>> PublishShedule(string id)
        {
            try
            {
                var train = await _trainService.ChangeSheduleStatus(id);
                if(train == null)
                {
                    return NotFound();
                }
                return Ok(train);
            } catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            } catch (Exception)
            {
                return BadRequest(new { error = "An error occurred while publishing the shedule." });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Train>>> SearchAvailableTrains(string fromStation, string toStation)
        {
            try
            {
                if (string.IsNullOrEmpty(fromStation) || string.IsNullOrEmpty(toStation))
                {
                    return BadRequest("Both 'fromStation' and 'toStation' must be provided.");
                }

                var availableTrains = await _trainService.GetAllTrainsAsync();

                // Filter the available trains based on the 'fromStation' and 'toStation' criteria.
                var filteredTrains = availableTrains.Where(train =>
                {
                    var stationDistances = train.Schedule.StationDistances;
                    var fromStationIndex = stationDistances.FindIndex(s => s.Station.Equals(fromStation, StringComparison.OrdinalIgnoreCase));
                    var toStationIndex = stationDistances.FindIndex(s => s.Station.Equals(toStation, StringComparison.OrdinalIgnoreCase));

                    // Ensure that both the 'fromStation' and 'toStation' are found in the station distances.
                    if (fromStationIndex != -1 && toStationIndex != -1)
                    {
                        // Make sure 'fromStation' comes before 'toStation' in the station order.
                        if (fromStationIndex < toStationIndex)
                        {
                            // Calculate the distance between 'fromStation' and 'toStation'.
                            var distanceFrom = stationDistances[fromStationIndex].DistanceFromStart;
                            var distanceTo = stationDistances[toStationIndex].DistanceFromStart;
                            var distance = distanceTo - distanceFrom;

                            // Check if there are available seats on the train.
                            if (train.AvailableSeats > 0 && train.Status == "available" && distance > 0)
                            {
                                // Calculate the price per ticket based on the distance and pricePerKM.
                                var pricePerTicket = distance * train.PricePerKM;

                                // Include the calculated price in the train object.
                                train.PricePerTicket = pricePerTicket;

                                return true;
                            }
                        }
                    }

                    return false;
                }).ToList();

                return Ok(filteredTrains);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



    }
}
