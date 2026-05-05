import { Badge } from '@/components/ui/badge';
import type { SchemaTerm } from '@/types/schema-org';

/** Renders the layer / pending / deprecation badges for a term. */
export function LayerBadges({ term }: { term: SchemaTerm }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge variant={term.layer === 'health-lifesci' ? 'accent' : 'outline'}>
        {term.layer === 'health-lifesci' ? 'health-lifesci' : term.layer}
      </Badge>
      {term.pending && <Badge variant="warning">pending</Badge>}
      {term.supersededBy && (
        <Badge variant="warning">deprecated → {term.supersededBy.replace('schema:', '')}</Badge>
      )}
    </div>
  );
}
