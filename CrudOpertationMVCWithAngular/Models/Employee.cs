using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudOpertationMVCWithAngular.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
    }
}
