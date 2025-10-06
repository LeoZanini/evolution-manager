/**
 * Example: pages/api/webhook/evolution/[instance].ts
 *
 * Rota para receber webhooks da Evolution API
 */

// import { NextApiRequest, NextApiResponse } from "next";
// import { handleEvolutionWebhook } from "evolution-manager";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { instance } = req.query;
//     const instanceName = instance as string;

//     // Evolution API webhook payload
//     const { event, data } = req.body;

//     console.log(`[Webhook API] Evento recebido para ${instanceName}:`, {
//       event,
//       data: JSON.stringify(data).substring(0, 100) + "...",
//     });

//     // Call the package webhook handler
//     handleEvolutionWebhook(instanceName, event, data);

//     // Respond to Evolution API
//     res.status(200).json({
//       success: true,
//       message: `Webhook ${event} processado para ${instanceName}`,
//     });
//   } catch (error) {
//     console.error("[Webhook API] Erro:", error);
//     res.status(500).json({
//       error: "Erro interno do servidor",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// }

/**
 * Example: Como configurar webhook ao usar o package
 */

// Em seu componente React:
/*
import { useEvolutionManager } from 'evolution-manager';

const MyComponent = () => {
  const evolution = useEvolutionManager({
    baseUrl: "https://sua-evolution-api.com",
    apiKey: "sua-api-key",
    webhookUrl: "https://seu-app.vercel.app" // URL do seu Next.js app
  });

  // O package automaticamente configura webhooks ao criar/conectar instâncias
  // Quando Evolution API enviar evento para:
  // https://seu-app.vercel.app/api/webhook/evolution/[instance]
  // O estado da instância será atualizado automaticamente!

  return (
    <InstanceController 
      baseUrl="https://sua-evolution-api.com"
      apiKey="sua-api-key" 
      instanceName="minha-instancia"
    />
  );
};
*/
