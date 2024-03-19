import { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.join(__dirname, '..', 'db.json');

async function readDb() {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
}

async function writeDb(data: any) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Create buyer
export const createBuyer = async (req: Request, res: Response) => {
    const { name, companyName } = req.body;

    if (!name || !companyName ) {
        return res.status(400).send({ message: 'Données manquantes pour créer un rendez-vous.' });
    }

    const db = await readDb();
    if (!db.buyer) {
        db.buyer = [];
    }

    const newbuyer = { id: uuidv4(), name, companyName };
    db.buyer.push(newbuyer);

    await writeDb(db);

    res.status(201).send(newbuyer);
};
// create seller
export const createSeller = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: 'Données manquantes pour créer un rendez-vous.' });
    }

    const db = await readDb();
    if (!db.seller) {
        db.seller = [];
    }

    const newseller = { id: uuidv4(), name };
    db.seller.push(newseller);

    await writeDb(db);

    res.status(201).send(newseller);
};

//getAllBuyers
export const getBuyer = async (req: Request, res: Response) => {
    try {
        const db = await readDb();

        // Vérifie si la propriété 'buyer' existe dans la base de données
        if (!db.buyer) {
            return res.status(404).send({ message: 'Aucun acheteur trouvé.' });
        }

        // Renvoie tous les acheteurs
        res.send(db.buyer);
    } catch (error) {
        console.error('Error fetching buyers:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des acheteurs.' });
    }
};
export const getSeller = async (req: Request, res: Response) => {
    try {
        const db = await readDb();

        // je Vérifie si 'seller' existe dans la base de données
        if (!db.seller) {
            return res.status(404).send({ message: 'Aucun acheteur trouvé.' });
        }
        res.send(db.seller);
    } catch (error) {
        console.error('Error fetching Sellers:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des acheteurs.' });
    }
};


export const createAppointment = async (req: Request, res: Response) => {
    const { title, type, location, host, client, startTime, endTime } = req.body;

    if (!title || !type || !host || !client || !startTime || !endTime) {
        return res.status(400).send({ message: 'Données manquantes pour créer un rendez-vous.' });
    }

    const db = await readDb();
    

    // Vérification des conflits
    const conflict = db.appointments.some((appointment: any) =>
        (appointment.host === host || appointment.client === client) &&
        (new Date(startTime) < new Date(appointment.endTime) && new Date(endTime) > new Date(appointment.startTime))
    );

    if (conflict) {
        return res.status(409).send({ message: 'Conflit d\'horaire détecté pour le vendeur ou l\'acheteur.' });
    }

    const newAppointment = { id: uuidv4(), title, type, location, host, client, startTime, endTime };
    db.appointments.push(newAppointment);

    await writeDb(db);

    res.status(201).send(newAppointment);
};

//Update
export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const db = await readDb();
    const appointmentIndex = db.appointments.findIndex((appointment: any) => appointment.id === id);

    if (appointmentIndex === -1) {
        return res.status(404).send({ message: 'Rendez-vous non trouvé.' });
    }
    db.appointments[appointmentIndex] = { ...db.appointments[appointmentIndex], ...updateData };
    await writeDb(db);
    res.send(db.appointments[appointmentIndex]);
};

//Delete
export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    const db = await readDb();
    const appointmentIndex = db.appointments.findIndex((appointment: any) => appointment.id === id);

    if (appointmentIndex === -1) {
        return res.status(404).send({ message: 'Rendez-vous non trouvé.' });
    }

    db.appointments.splice(appointmentIndex, 1);

    await writeDb(db);
    res.status(204).send();
};

//getAll
export const getAppointments = async (req: Request, res: Response) => {
    const db = await readDb();
    res.send(db.appointments);
};

//getById
export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const db = await readDb();
    const appointment = db.appointments.find((appointment: any) => appointment.id === id);

    if (!appointment) {
        return res.status(404).send({ message: 'Rendez-vous non trouvé.' });
    }

    res.send(appointment);
};
