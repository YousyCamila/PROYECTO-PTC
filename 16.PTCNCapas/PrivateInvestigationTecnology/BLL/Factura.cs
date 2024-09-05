using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Exceptions;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Factura
    {
        public async Task<FACTURA> CreateAsync(FACTURA factura)
        {
            FACTURA facturaResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe una factura con la misma descripción y fecha de emisión
                FACTURA facturaSearch = await repository.RetrieveAsync<FACTURA>(f => f.Descripcion_Serv == factura.Descripcion_Serv && f.Fecha_Emision == factura.Fecha_Emision);
                if (facturaSearch == null)
                {
                    // No existe, podemos crearla
                    facturaResult = await repository.CreateAsync(factura);
                }
                else
                {
                    // Lanzar una excepción si la factura ya existe
                    FacturaExceptions.ThrowFacturaAlreadyExistsException(factura.Descripcion_Serv, factura.Fecha_Emision);
                }
            }
            return facturaResult!;
        }

        public async Task<FACTURA> RetrieveByIDAsync(int id)
        {
            FACTURA result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                FACTURA factura = await repository.RetrieveAsync<FACTURA>(f => f.ID_Factura == id);

                // Verificar si la factura fue encontrada
                if (factura == null)
                {
                    // Lanzar una excepción si no se encuentra la factura
                    FacturaExceptions.ThrowInvalidFacturaIdException(id);
                }

                return factura;
            }
        }

        public async Task<List<FACTURA>> RetrieveAllAsync()
        {
            List<FACTURA> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<FACTURA>(f => true); // Devuelve todas las facturas
            }

            return result;
        }

        public async Task<bool> UpdateAsync(FACTURA factura)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe una factura con la misma descripción y fecha de emisión, excluyendo la actual
                FACTURA facturaSearch = await repository.RetrieveAsync<FACTURA>(
                    f => f.Descripcion_Serv == factura.Descripcion_Serv && f.Fecha_Emision == factura.Fecha_Emision && f.ID_Factura != factura.ID_Factura);

                if (facturaSearch == null)
                {
                    // No existe otra factura con los mismos detalles
                    result = await repository.UpdateAsync(factura);
                }
                else
                {
                    // Lanzar una excepción si ya existe otra factura con los mismos detalles
                    FacturaExceptions.ThrowFacturaAlreadyExistsException(factura.Descripcion_Serv, factura.Fecha_Emision);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var factura = await RetrieveByIDAsync(id);

            if (factura != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(factura);
                }
            }
            else
            {
                // Lanzar una excepción si la factura no existe
                FacturaExceptions.ThrowInvalidFacturaIdException(id);
            }

            return result;
        }
    }
}

