using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using projetoRPA.Models;
using projetoRPA.Service;

namespace projetoRPA.Controllers
{

    [Route("[controller]/[action]")]
    [ApiController]
    public class RpaController : Controller
    {
        IQueryService _rpaService = null;
        public RpaController(IQueryService rpaService)
        {
            _rpaService = rpaService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetRpa(int mes, int ano, int filial)
        {
            var xmlString = _rpaService.GetXml(mes, ano, filial);

            if (xmlString == null)
                return NotFound();

            return Content(xmlString, "text/xml");
        }

        //[HttpGet]
        //public string GetRpa(int mes, int ano)
        //{
        //    return _rpaService.GetXml(mes, ano);
        //}


    }
}