using CandidateTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private string _connectionString;
        public CandidateController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost("add")]
        public void Add(Candidate candidate)
        {
            var repo = new CandidateRepo(_connectionString);
            repo.Add(candidate);
        }
        [HttpGet("getbystatus")]
        public List<Candidate> GetByStatus(Status status)
        {
            var repo = new CandidateRepo(_connectionString);
            return repo.GetByStatus(status);
        }
        [HttpGet("getbyid")]
        public Candidate GetById(int id)
        {
            var repo = new CandidateRepo(_connectionString);
            return repo.GetById(id);
        }
        [HttpPost("update")]
        public void Update(Candidate candidate)
        {
            var repo = new CandidateRepo(_connectionString);
            repo.UpdateStatus(candidate);
        }
        [HttpGet("getpendingcounts")]
        public int GetPendingCounts()
        {
            var repo = new CandidateRepo(_connectionString);
            return repo.GetPendingCounts();
        }

        [HttpGet("getconfirmedcounts")]
        public int GetConfirmedCounts()
        {
            var repo = new CandidateRepo(_connectionString);
            return repo.GetConfirmedCounts();
        }

        [HttpGet("getdeclinedcounts")]
        public int GetDeclinedCounts()
        {
            var repo = new CandidateRepo(_connectionString);
            return repo.GetDeclinedCounts();
        }



    }
}
