using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Formulario
    {
        public async Task<FORMULARIO> CreateAsync(FORMULARIO formulario)
        {
            FORMULARIO formularioResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un formulario con el mismo nombre y número de celular
                FORMULARIO formularioSearch = await repository.RetrieveAsync<FORMULARIO>(f => f.Nombre == formulario.Nombre && f.Numero_Celular == formulario.Numero_Celular);
                if (formularioSearch == null)
                {
                    // No existe, podemos crearlo
                    formularioResult = await repository.CreateAsync(formulario);
                }
                else
                {
                    // Lanzar una excepción si el formulario ya existe
                    FormularioExceptions.ThrowFormularioAlreadyExistsException(formulario.Nombre, formulario.Numero_Celular);
                }
            }
            return formularioResult!;
        }

        public async Task<FORMULARIO> RetrieveByIDAsync(int id)
        {
            FORMULARIO result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                FORMULARIO formulario = await repository.RetrieveAsync<FORMULARIO>(f => f.ID_Formulario == id);

                // Verificar si el formulario fue encontrado
                if (formulario == null)
                {
                    // Lanzar una excepción si no se encuentra el formulario
                    FormularioExceptions.ThrowInvalidFormularioIdException(id);
                }

                return formulario;
            }
        }

        public async Task<List<FORMULARIO>> RetrieveAllAsync()
        {
            List<FORMULARIO> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<FORMULARIO>(f => true); // Devuelve todos los formularios
            }

            return result;
        }

        public async Task<bool> UpdateAsync(FORMULARIO formulario)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un formulario con el mismo nombre y número de celular, excluyendo el actual
                FORMULARIO formularioSearch = await repository.RetrieveAsync<FORMULARIO>(
                    f => f.Nombre == formulario.Nombre && f.Numero_Celular == formulario.Numero_Celular && f.ID_Formulario != formulario.ID_Formulario);

                if (formularioSearch == null)
                {
                    // No existe otro formulario con los mismos detalles
                    result = await repository.UpdateAsync(formulario);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro formulario con los mismos detalles
                    FormularioExceptions.ThrowFormularioAlreadyExistsException(formulario.Nombre, formulario.Numero_Celular);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var formulario = await RetrieveByIDAsync(id);

            if (formulario != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(formulario);
                }
            }
            else
            {
                // Lanzar una excepción si el formulario no existe
                FormularioExceptions.ThrowInvalidFormularioIdException(id);
            }

            return result;
        }
    }
}
