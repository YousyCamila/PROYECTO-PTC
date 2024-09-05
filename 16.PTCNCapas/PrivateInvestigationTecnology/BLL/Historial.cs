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
    public class Historial
    {
        public async Task<HISTORIAL> CreateAsync(HISTORIAL historial)
        {
            HISTORIAL historialResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un historial con la misma descripción para el cliente
                HISTORIAL historialSearch = await repository.RetrieveAsync<HISTORIAL>(
                    h => h.Descripcion == historial.Descripcion && h.ID_Cliente == historial.ID_Cliente);

                if (historialSearch == null)
                {
                    // No existe, podemos crearlo
                    historialResult = await repository.CreateAsync(historial);
                }
                else
                {
                    // Lanzar una excepción si el historial ya existe
                    HistorialExceptions.ThrowHistorialAlreadyExistsException(historial.Descripcion, historial.ID_Cliente);
                }
            }
            return historialResult!;
        }

        public async Task<HISTORIAL> RetrieveByIDAsync(int id)
        {
            HISTORIAL result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                HISTORIAL historial = await repository.RetrieveAsync<HISTORIAL>(h => h.ID_Historial == id);

                // Verificar si el historial fue encontrado
                if (historial == null)
                {
                    // Lanzar una excepción si no se encuentra el historial
                    HistorialExceptions.ThrowInvalidHistorialIdException(id);
                }

                return historial;
            }
        }

        public async Task<List<HISTORIAL>> RetrieveAllAsync()
        {
            List<HISTORIAL> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<HISTORIAL>(h => true); // Devuelve todos los historiales
            }

            return result;
        }

        public async Task<bool> UpdateAsync(HISTORIAL historial)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un historial con la misma descripción para el cliente, excluyendo el actual
                HISTORIAL historialSearch = await repository.RetrieveAsync<HISTORIAL>(
                    h => h.Descripcion == historial.Descripcion && h.ID_Cliente == historial.ID_Cliente && h.ID_Historial != historial.ID_Historial);

                if (historialSearch == null)
                {
                    // No existe otro historial con los mismos detalles
                    result = await repository.UpdateAsync(historial);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro historial con los mismos detalles
                    HistorialExceptions.ThrowHistorialAlreadyExistsException(historial.Descripcion, historial.ID_Cliente);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var historial = await RetrieveByIDAsync(id);

            if (historial != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(historial);
                }
            }
            else
            {
                // Lanzar una excepción si el historial no existe
                HistorialExceptions.ThrowInvalidHistorialIdException(id);
            }

            return result;
        }
    }
}

