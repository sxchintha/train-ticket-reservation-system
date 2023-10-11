using Microsoft.AspNetCore.Mvc;
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
                // Create a new train object based on the request body
                var newTrain = new Train
                {
                    TrainID = train.TrainID,
                    TrainName = train.TrainName,
                    Schedule = train.Schedule,
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
    }
}
