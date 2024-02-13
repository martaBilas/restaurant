﻿using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace restaurant.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportMealsController : ControllerBase
    {
        private readonly IMealImportService _mealImportService;

        public ImportMealsController(IMealImportService mealImportService)
        {
            _mealImportService = mealImportService;
        }

        [HttpPost("ImportMeals")]
        public IActionResult ImportMeals(IFormFile postedFile)
        {
            using (var reader = new StreamReader(postedFile.OpenReadStream()))
            {
                var text = reader.ReadToEnd();
                _mealImportService.ImportMeals(text);
            }

            return Ok("Imported");
        }
    }


}
