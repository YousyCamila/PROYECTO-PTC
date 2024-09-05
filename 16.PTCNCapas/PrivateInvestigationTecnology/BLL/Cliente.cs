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
    public class Clientes
    {
        public async Task<CLIENTE> CreateAsync(CLIENTE cliente)
        {
            CLIENTE clienteResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si el cliente ya existe basado en algún criterio (por ejemplo, Dirección)
                CLIENTE clienteSearch = await repository.RetrieveAsync<CLIENTE>(c => c.Direccion == cliente.Direccion);
                if (clienteSearch == null)
                {
                    // No existe, podemos crearlo
                    clienteResult = await repository.CreateAsync(cliente);
                }
                else
                {
                    // Lanzar una excepción si el cliente ya existe
                    ClienteExceptions.ThrowClienteAlreadyExistsException(cliente.Direccion!);
                }
            }
            return clienteResult!;
        }

        public async Task<CLIENTE> RetrieveByIDAsync(int id)
        {
            CLIENTE result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                CLIENTE cliente = await repository.RetrieveAsync<CLIENTE>(c => c.ID_Cliente == id);

                // Verificar si el cliente fue encontrado
                if (cliente == null)
                {
                    // Lanzar una excepción si no se encuentra el cliente
                    ClienteExceptions.ThrowInvalidClienteIdException(id);
                }

                return cliente;
            }
        }

        public async Task<List<CLIENTE>> RetrieveAllAsync()
        {
            List<CLIENTE> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<CLIENTE>(c => true); // Devuelve todos los clientes
            }

            return result;
        }

        public async Task<bool> UpdateAsync(CLIENTE cliente)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si el cliente ya existe, excluyendo al cliente actual (por ejemplo, por dirección)
                CLIENTE clienteSearch = await repository.RetrieveAsync<CLIENTE>(
                    c => c.Direccion == cliente.Direccion && c.ID_Cliente != cliente.ID_Cliente);

                if (clienteSearch == null)
                {
                    // No existe otro cliente con la misma dirección
                    result = await repository.UpdateAsync(cliente);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro cliente con la misma dirección
                    ClienteExceptions.ThrowClienteAlreadyExistsException(cliente.Direccion!);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var cliente = await RetrieveByIDAsync(id);

            if (cliente != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(cliente);
                }
            }
            else
            {
                // Lanzar una excepción si el cliente no existe
                ClienteExceptions.ThrowInvalidClienteIdException(id);
            }

            return result;
        }
    }
}
