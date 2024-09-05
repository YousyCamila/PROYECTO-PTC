using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Auditoria
    {
        public async Task<AUDITORIA> CreateAsync(AUDITORIA auditoria)
        {
            AUDITORIA auditoriaResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Crear una nueva auditoría
                auditoriaResult = await repository.CreateAsync(auditoria);
            }
            return auditoriaResult!;
        }

        public async Task<AUDITORIA> RetrieveByIDAsync(int id)
        {
            AUDITORIA result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                AUDITORIA auditoria = await repository.RetrieveAsync<AUDITORIA>(a => a.ID_Auditoria == id);

                // Check if auditoria was found
                if (auditoria == null)
                {
                    // Throw a custom exception
                    AuditoriaExceptions.ThrowInvalidAuditoriaIdException(id);
                }

                return auditoria;
            }
        }

        public async Task<List<AUDITORIA>> RetrieveAllAsync()
        {
            List<AUDITORIA> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<AUDITORIA>(a => true);
            }

            return result;
        }

        public async Task<bool> UpdateAsync(AUDITORIA auditoria)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.UpdateAsync(auditoria);
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;
            var auditoria = await RetrieveByIDAsync(id);

            if (auditoria != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(auditoria);
                }
            }
            else
            {
                AuditoriaExceptions.ThrowInvalidAuditoriaIdException(id);
            }

            return result;
        }
    }
}

