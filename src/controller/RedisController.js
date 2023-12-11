import { prismaClient } from '../prisma/client.js';
import { getCache, setCache } from '../utils/redisUtils.js';
import Pessoa from '../models/Pessoa.js';

async function getComprasCliente(req, res) {
    const { idCliente } = req.params;
    const chaveRedis = `ComprasCliente${idCliente}`;

    try {
        let dadosCache = await getCache(chaveRedis);
        if (dadosCache) {
            return res.status(200).json(dadosCache);
        }

        const compras = await prismaClient.compras.findMany({
            where: {
                id_cliente: parseInt(idCliente)
            },
            include: {
                cliente: true
            }
        });

        if (!compras.length) {
            return res.status(404).json({ mensagem: "Nenhuma compra encontrada para este cliente." });
        }

        const clienteEmail = compras[0].cliente.email;
        const pessoas = await Pessoa.find({ email: clienteEmail }).populate('amigos');
        const nomesDosAmigos = pessoas[0].amigos.map(amigo => amigo.nome);
        
        const dadosConsolidados = compras.map(compra => ({
            nomeCliente: compra.cliente.nome, 
            amigos: nomesDosAmigos, 
            compra: compra.produto, 
            valor: compra.valor
        }));

        await setCache(chaveRedis, dadosConsolidados, 3600);
        dadosCache = await getCache(chaveRedis);

        res.status(200).json(dadosCache);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getComprasCliente };
