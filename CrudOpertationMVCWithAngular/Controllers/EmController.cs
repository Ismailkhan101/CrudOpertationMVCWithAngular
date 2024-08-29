using CrudOpertationMVCWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudOpertationMVCWithAngular.Controllers
{
    public class EmController : Controller
    {
        private Models.EmployeeDbContext db = new EmployeeDbContext();
        // GET: Em
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Get_AllEmployee()
        {

            var Emp = db.Employees.ToList();
            return Json(Emp, JsonRequestBehavior.AllowGet);

        }


        public JsonResult Get_EmployeeById(string Id)
        {

            int EmpId = int.Parse(Id);
            return Json(db.Employees.Find(EmpId), JsonRequestBehavior.AllowGet);
        }

        public string Insert_Employee(Employee Employe)
        {
            if (Employe != null)
            {
                
                    db.Employees.Add(Employe);
                    db.SaveChanges();
                    return "Employee Added Successfully";
                
            }
            else
            {
                return "Employee Not Inserted! Try Again";
            }
        }

        public string Delete_Employee(Employee Emp)
        {
            if (Emp != null)
            {
                
                    var Emp_ = db.Entry(Emp);
                    if (Emp_.State == System.Data.Entity.EntityState.Detached)
                    {
                        db.Employees.Attach(Emp);
                        db.Employees.Remove(Emp);
                    }
                    db.SaveChanges();
                    return "Employee Deleted Successfully";
                
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }
        }
        public string Update_Employee(Employee Emp)
        {
            if (Emp != null)
            {

                var Emp_ = db.Entry(Emp);
                Employee EmpObj = db.Employees.Where(x => x.EmployeeID == Emp.EmployeeID).FirstOrDefault();
                EmpObj.EmployeeID = Emp.EmployeeID;
                EmpObj.Name = Emp.Name;
                EmpObj.Position = Emp.Position;
                EmpObj.Salary = Emp.Salary;
                db.SaveChanges();
                return "Employee Updated Successfully";

            }
            else
            {
                return "Employee Not Updated! Try Again";
            }

        }
            //practics pages
            public ActionResult Create()
            {
                return View();
            }
        public ActionResult Update()
        {
            return View();
        }
    }
        }
   
    
