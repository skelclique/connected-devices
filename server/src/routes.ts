import { z } from 'zod';
import { FastifyInstance } from "fastify";

import fetch from "node-fetch";
import sleep from 'sleep-promise';

async function fetchMACVendors(mac: string) {
  const response = await fetch(`https://api.macvendors.com/v1/lookup/${mac}`, 
    { headers: { Authorization: "Bearer " + process.env.TOKEN }
  });

  if (response.status === 200) {
    return JSON.parse(await response.text()).data.organization_name;
  } else {
    return JSON.parse(await response.text()).errors.detail;
  }
}

export async function routes(app: FastifyInstance) {
  app.post('/', async (request) => {
    const createDevicesBody = z.object({
      unformattedDevices: z.string(),
      lanTemplate: z.string(),
      wirelessTemplate: z.string(),
    });

    const formattedDevices = new Array<string>();

    const requestBody = createDevicesBody.parse(request.body);
    
    const unformattedDevices = requestBody.unformattedDevices.split('\n').map(device => device.split('    '));

    for (const device of unformattedDevices) {
      const [connection, lan,,, ip, dbm] = device;

      const regex = /([A-Za-z0-9]+((-|:)[A-Za-z0-9]+)+)/i;

      const mac = device.find((prop) => regex.test(prop) ? prop : null) || '';

      const name = await fetchMACVendors(mac);

      await sleep(500);

      switch (connection) {
        case 'LAN':
          formattedDevices.push(eval(`\`${requestBody.lanTemplate}\``));
        break;

        case '2.4G_SSID':
        case '5G_SSID':
          formattedDevices.push(eval(`\`${requestBody.wirelessTemplate}\``));
        break;
      
        default:
          formattedDevices.push(`${name} (${mac})`);
        break;
      }
    }

    return {
      formattedDevices: formattedDevices.join(' '),
    };
  });
}