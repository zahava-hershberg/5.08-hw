using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace CandidateTracker.Data
{
    public class CandidateRepo
    {
        private readonly string _connectionString;
        public CandidateRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void Add(Candidate candidate)
        {
            using var context = new CandidateDataContext(_connectionString);
            context.Candidates.Add(candidate);
            context.SaveChanges();
        }
        public List<Candidate> GetByStatus(Status status)
        {
            using var context = new CandidateDataContext(_connectionString);
            return context.Candidates.Where(c => c.Status == status).ToList();
        }
        public Candidate GetById(int id)
        {
            using var context = new CandidateDataContext(_connectionString);
            return context.Candidates.FirstOrDefault(c => c.Id == id);
        }
        public void UpdateStatus(Candidate candidate)
        {
            using var context = new CandidateDataContext(_connectionString);
            context.Candidates.Update(candidate);
            context.SaveChanges();
        }
        public int GetPendingCounts()
        {
            using var context = new CandidateDataContext(_connectionString);
            return context.Candidates.Count(c => c.Status == Status.Pending);
        }

        public int GetConfirmedCounts()
        {
            using var context = new CandidateDataContext(_connectionString);
            return context.Candidates.Count(c => c.Status == Status.Confirmed);
        }
        public int GetDeclinedCounts()
        {
            using var context = new CandidateDataContext(_connectionString);
            return context.Candidates.Count(c => c.Status == Status.Declined);
        }

    }
}
