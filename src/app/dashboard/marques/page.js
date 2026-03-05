export const runtime = 'edge';
import MarquesTable from '@/components/MarquesTable';

export default function MarquesPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Base de Données Marques</h1>
        <p className="text-gray-600">Consultation en temps réel de la base INPI/Interne.</p>
      </div>

      {/* Le composant tableau s'affiche ici */}
      <MarquesTable />
    </div>
  );
}
