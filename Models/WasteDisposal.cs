using System;

namespace NYShipping.Models
{
    public class WasteDisposal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double TonsDisposed { get; set; }
        public string? DisposalMethod { get; set; }
        public string? Location { get; set; }
    }
}
