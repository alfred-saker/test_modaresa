export type AppointmentType = 'virtual' | 'physical';

export interface Appointment {
    id: string;
    title: string;
    type: AppointmentType;
    location?: string; // Uniquement pour les rendez-vous physiques
    host: string; // ID du vendeur
    client: string; // ID de l'acheteur
    startTime: Date;
    endTime: Date;
}

// Stockage simplifié des rendez-vous en mémoire
export const appointments: Appointment[] = [];
