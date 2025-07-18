import { Alerte, Intervention } from '../contexts/alertes-interventions-context';

export const fakeAlertes: Alerte[] = [
  {
    id: '1',
    titre: 'Température élevée',
    description: 'La température du bassin 1 dépasse 28°C.',
    date: '2024-06-01T10:00:00Z',
  },
  {
    id: '2',
    titre: 'pH bas',
    description: 'Le pH du bassin 2 est inférieur à 6.5.',
    date: '2024-06-02T08:30:00Z',
  },
];

export const fakeInterventions: Intervention[] = [
  {
    id: '101',
    titre: 'Contrôle pompe bassin 3',
    description: 'Vérification de la pompe suite à une alerte.',
    date: '2024-05-30T14:00:00Z',
  },
]; 