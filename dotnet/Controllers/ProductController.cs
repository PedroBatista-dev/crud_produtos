using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using dotnet.Models;
using dotnet.Services;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        public ProductController()
        {
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll() =>
            ProductService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = ProductService.Get(id);

            if(product == null)
                return NotFound();

            return product;
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {            
            ProductService.Add(product);
            return CreatedAtAction(nameof(Create), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public ActionResult<Product> Update(int id, Product product)
        {
            var existingProduct = ProductService.Get(id);
            if (id != product.Id || existingProduct is null)
                return BadRequest();

            ProductService.Update(product);           

            return product;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = ProductService.Get(id);

            if (product is null)
                return NotFound();

            ProductService.Delete(id);

            return NoContent();
        }
    }
}