// Seeds reference data (Carriers, Ports) plus a few sample Customers/Quotations
// so the API is demoable out of the box. Safe to re-run: Carriers/Ports are
// upserted by their natural key, Customers by email; Quotations are only
// inserted the first time (they have no natural unique key of their own).
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const Carrier = require('../models/Carrier');
const Port = require('../models/Port');
const Customer = require('../models/Customer');
const Quotation = require('../models/Quotation');

const carriers = [
  { name: 'Maersk', scacCode: 'MAEU', contactEmail: 'contact@maersk.com', phone: '+45 33 63 33 63', website: 'https://www.maersk.com' },
  { name: 'MSC', scacCode: 'MSCU', contactEmail: 'info@msc.com', phone: '+41 22 703 8888', website: 'https://www.msc.com' },
  { name: 'CMA CGM', scacCode: 'CMDU', contactEmail: 'info@cma-cgm.com', phone: '+33 4 88 91 90 00', website: 'https://www.cma-cgm.com' },
  { name: 'Hapag-Lloyd', scacCode: 'HLCU', contactEmail: 'info@hlag.com', phone: '+49 40 3001 0', website: 'https://www.hapag-lloyd.com' },
  { name: 'ONE', scacCode: 'ONEY', contactEmail: 'info@one-line.com', phone: '+65 6572 0300', website: 'https://www.one-line.com' },
  { name: 'Evergreen', scacCode: 'EGLV', contactEmail: 'info@evergreen-marine.com', phone: '+886 2 2505 7766', website: 'https://www.evergreen-marine.com' },
  { name: 'COSCO', scacCode: 'COSU', contactEmail: 'info@coscoshipping.com', phone: '+86 21 3528 0000', website: 'https://www.cosco-shipping.com' },
  { name: 'Zim', scacCode: 'ZIMU', contactEmail: 'info@zim.com', phone: '+972 4 865 2111', website: 'https://www.zim.com' },
];

const ports = [
  { name: 'Puerto de Buenos Aires', unlocode: 'ARBUE', country: 'Argentina' },
  { name: 'Puerto de Valparaíso', unlocode: 'CLVAP', country: 'Chile' },
  { name: 'Port of Rotterdam', unlocode: 'NLRTM', country: 'Netherlands' },
  { name: 'Port of Barcelona', unlocode: 'ESBCN', country: 'Spain' },
  { name: 'Port of Shanghai', unlocode: 'CNSHA', country: 'China' },
  { name: 'Port of Los Angeles', unlocode: 'USLAX', country: 'United States' },
  { name: 'Porto de Santos', unlocode: 'BRSSZ', country: 'Brazil' },
  { name: 'Puerto de Montevideo', unlocode: 'UYMVD', country: 'Uruguay' },
];

const customers = [
  { name: 'Ana Torres', email: 'ana.torres@example.com', phone: '+54 11 5555-0100', company: 'Torres Import/Export S.A.' },
  { name: 'Carlos Mendez', email: 'carlos.mendez@example.com', phone: '+56 9 5555-0101', company: 'Mendez Logistics Ltda.' },
  { name: 'Laura Fernandez', email: 'laura.fernandez@example.com', phone: '+598 99 555 010', company: 'Fernandez Trading Co.' },
];

const upsertAll = async (Model, docs, key) =>
  Promise.all(
    docs.map((doc) => Model.findOneAndUpdate({ [key]: doc[key] }, { $set: doc }, { upsert: true, new: true }))
  );

const seed = async () => {
  await connectDB();
  console.log('Connected. Seeding...');

  const savedCarriers = await upsertAll(Carrier, carriers, 'scacCode');
  console.log(`Carriers ready: ${savedCarriers.length}`);

  const savedPorts = await upsertAll(Port, ports, 'unlocode');
  console.log(`Ports ready: ${savedPorts.length}`);

  const savedCustomers = await upsertAll(Customer, customers, 'email');
  console.log(`Customers ready: ${savedCustomers.length}`);

  const existingQuotations = await Quotation.countDocuments();
  if (existingQuotations === 0) {
    const [ana, carlos, laura] = savedCustomers;
    const [maersk, msc, cmacgm] = savedCarriers;

    await Quotation.insertMany([
      {
        customerId: ana._id,
        carrierId: maersk._id,
        origin: 'Puerto de Buenos Aires',
        destination: 'Port of Rotterdam',
        cargoType: 'general',
        weight: 12000,
        volume: 28.5,
        rate: 2450,
        currency: 'USD',
        status: 'draft',
        validUntil: new Date('2026-12-31'),
      },
      {
        customerId: carlos._id,
        carrierId: msc._id,
        origin: 'Puerto de Valparaíso',
        destination: 'Port of Shanghai',
        cargoType: 'refrigerated',
        weight: 8000,
        volume: 15,
        rate: 3100,
        currency: 'USD',
        status: 'sent',
        validUntil: new Date('2026-11-30'),
      },
      {
        customerId: laura._id,
        carrierId: cmacgm._id,
        origin: 'Puerto de Montevideo',
        destination: 'Port of Barcelona',
        cargoType: 'general',
        weight: 5000,
        volume: 10,
        rate: 1800,
        currency: 'USD',
        status: 'accepted',
        validUntil: new Date('2026-10-31'),
      },
    ]);
    console.log('Sample quotations created: 3');
  } else {
    console.log(`Quotations collection already has ${existingQuotations} document(s), skipping sample inserts.`);
  }

  console.log('Seed complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
