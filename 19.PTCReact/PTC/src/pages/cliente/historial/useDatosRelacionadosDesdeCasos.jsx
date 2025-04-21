import { useMemo } from 'react';

/**
 * Hook para extraer usuarios y documentos relacionados a partir de una lista de casos.
 * @param {Array} casos - Lista de casos con datos poblados (cliente, detective, documentos).
 */
const useDatosRelacionadosDesdeCasos = (casos) => {
  const {
    clientes,
    detectives,
    usuarios,
    evidencias,
    contratos,
    registros,
  } = useMemo(() => {
    const clienteMap = new Map();
    const detectiveMap = new Map();
    const evidenciaMap = new Map();
    const contratoMap = new Map();
    const registroMap = new Map();

    casos.forEach((caso) => {
      if (caso.idCliente) {
        clienteMap.set(caso.idCliente._id, caso.idCliente);
      }

      if (caso.idDetective) {
        detectiveMap.set(caso.idDetective._id, caso.idDetective);
      }

      (caso.evidencias || []).forEach((e) => evidenciaMap.set(e._id, e));
      (caso.contratos || []).forEach((c) => contratoMap.set(c._id, c));
      (caso.registroCasos || []).forEach((r) => registroMap.set(r._id, r));
    });

    const clientes = Array.from(clienteMap.values());
    const detectives = Array.from(detectiveMap.values());
    const usuarios = [...clientes, ...detectives];
    const evidencias = Array.from(evidenciaMap.values());
    const contratos = Array.from(contratoMap.values());
    const registros = Array.from(registroMap.values());

    return {
      clientes,
      detectives,
      usuarios,
      evidencias,
      contratos,
      registros,
    };
  }, [casos]);

  return {
    clientes,
    detectives,
    usuarios,
    evidencias,
    contratos,
    registros,
  };
};

export default useDatosRelacionadosDesdeCasos;
