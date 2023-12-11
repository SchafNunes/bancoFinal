import { prismaClient } from "../../../../prisma/client.js";
import { getCache, setCache } from "../../../../utils/redisUtils.js";


export class GetCliente {
  async execute(clienteId) {
    const redisKey = `cliente:${clienteId}`;
    let cliente = await getCache(redisKey);

    if (!cliente) {
      // Busca no banco de dados
      cliente = await prismaClient.cliente.findUnique({ where: { id: parseInt(clienteId, 10) } });

      if (cliente) {
        // Salva no Redis
        setCache(redisKey, cliente, 3600); // Expira em 1 hora, por exemplo
      }
    }

    return cliente;
  }
}
