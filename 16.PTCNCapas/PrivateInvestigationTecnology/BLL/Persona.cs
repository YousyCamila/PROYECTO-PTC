using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class PersonaService
    {
        public async Task<PERSONA> CreateAsync(PERSONA persona)
        {
            PERSONA personaResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe una persona con el mismo DNI
                PERSONA personaSearch = await repository.RetrieveAsync<PERSONA>(
                    p => p.DNI == persona.DNI);

                if (personaSearch == null)
                {
                    // No existe, podemos crearlo
                    personaResult = await repository.CreateAsync(persona);
                }
                else
                {
                    // Lanzar una excepción si la persona ya existe
                    PersonaExceptions.ThrowPersonaAlreadyExistsException(persona.DNI);
                }
            }
            return personaResult!;
        }

        public async Task<PERSONA> RetrieveByIDAsync(int id)
        {
            PERSONA result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                PERSONA persona = await repository.RetrieveAsync<PERSONA>(p => p.ID_Persona == id);

                // Verificar si la persona fue encontrada
                if (persona == null)
                {
                    // Lanzar una excepción si no se encuentra la persona
                    PersonaExceptions.ThrowInvalidPersonaIdException(id);
                }

                return persona;
            }
        }

        public async Task<List<PERSONA>> RetrieveAllAsync()
        {
            List<PERSONA> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<PERSONA>(p => true); // Devuelve todas las personas
            }

            return result;
        }

        public async Task<bool> UpdateAsync(PERSONA persona)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe una persona con el mismo DNI, excluyendo la actual
                PERSONA personaSearch = await repository.RetrieveAsync<PERSONA>(
                    p => p.DNI == persona.DNI && p.ID_Persona != persona.ID_Persona);

                if (personaSearch == null)
                {
                    // No existe otra persona con el mismo DNI
                    result = await repository.UpdateAsync(persona);
                }
                else
                {
                    // Lanzar una excepción si ya existe otra persona con el mismo DNI
                    PersonaExceptions.ThrowPersonaAlreadyExistsException(persona.DNI);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var persona = await RetrieveByIDAsync(id);

            if (persona != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(persona);
                }
            }
            else
            {
                // Lanzar una excepción si la persona no existe
                PersonaExceptions.ThrowInvalidPersonaIdException(id);
            }

            return result;
        }
    }
}

