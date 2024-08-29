using CrudOpertationMVCWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace CrudOpertationMVCWithAngular.Controllers
{
    public class CurdseparatepagesController : Controller
    {
        private Models.EmployeeDbContext db = new EmployeeDbContext();
        // GET: Curdseparatepages
        public ActionResult Read()
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

        public ActionResult Insert()
        {
            return View();
        }
        public JsonResult Insert_Employee(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Json("Insert successful");
            }
            return Json("Invalid data");
        }

        public ActionResult Update(int id)
        {
            var employee = db.Employees.FirstOrDefault(x => x.EmployeeID == id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        [HttpPost]
        public JsonResult Update_Employee(Employee employee)
        {
            if (ModelState.IsValid)
            {
                var existingEmployee = db.Employees.FirstOrDefault(x => x.EmployeeID == employee.EmployeeID);
                if (existingEmployee != null)
                {
                    existingEmployee.Name = employee.Name;
                    existingEmployee.Position = employee.Position;
                    existingEmployee.Salary = employee.Salary;
                    db.SaveChanges();
                    return Json("Update successful");
                }
                return Json("Employee not found");
            }
            return Json("Invalid data");
        }


    }
}