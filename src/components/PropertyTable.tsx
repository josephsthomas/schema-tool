import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm } from '@/lib/routing';
import type { SchemaType } from '@/types/schema-org';

interface PropertyTableProps {
  type: SchemaType;
}

export function PropertyTable({ type }: PropertyTableProps) {
  const dataset = useDataset();
  const directIds = type.directProperties;
  const inheritedIds = type.inheritedProperties;

  if (directIds.length === 0 && inheritedIds.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No properties defined directly on this type.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[24%]">Property</TableHead>
          <TableHead className="w-[20%]">Expected types</TableHead>
          <TableHead className="w-[44%]">Description</TableHead>
          <TableHead className="w-[12%]">Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {directIds.map((propId) => (
          <PropertyRow
            key={propId}
            propId={propId}
            inheritanceSource="Self"
            datasetTermsById={dataset.termsById}
          />
        ))}
        {inheritedIds.map((propId) => {
          // figure out which ancestor first defined this property
          const inheritFrom = type.ancestors.find((aId) => {
            const a = dataset.termsById[aId];
            return a && (a.kind === 'Type' || a.kind === 'Enumeration') && a.directProperties.includes(propId);
          });
          return (
            <PropertyRow
              key={propId}
              propId={propId}
              inheritanceSource={inheritFrom ? bareName(inheritFrom) : 'Inherited'}
              datasetTermsById={dataset.termsById}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}

function PropertyRow({
  propId,
  inheritanceSource,
  datasetTermsById,
}: {
  propId: string;
  inheritanceSource: string;
  datasetTermsById: Record<string, import('@/types/schema-org').SchemaTerm>;
}) {
  const prop = datasetTermsById[propId];
  // Property may not be in our 163-property set (e.g. inherited core property like Thing.name)
  const isExternal = !prop;
  const propName = bareName(propId);
  const propIri = `https://schema.org/${propName}`;

  return (
    <TableRow>
      <TableCell>
        {isExternal ? (
          <a
            href={propIri}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            {propName}
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        ) : (
          <Link
            to={pathForTerm(prop.id, 'Property')}
            className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            {propName}
          </Link>
        )}
      </TableCell>
      <TableCell className="space-x-1">
        {!isExternal && prop.kind === 'Property' && prop.rangeIncludes.length > 0 ? (
          prop.rangeIncludes.map((rId) => {
            const r = datasetTermsById[rId];
            const rName = bareName(rId);
            if (r && (r.kind === 'Type' || r.kind === 'Enumeration')) {
              return (
                <Link
                  key={rId}
                  to={pathForTerm(r.id, r.kind)}
                  className="inline-block text-xs text-zinc-700 hover:underline dark:text-zinc-300"
                >
                  {rName}
                </Link>
              );
            }
            return (
              <span key={rId} className="inline-block text-xs text-zinc-500">
                {rName}
              </span>
            );
          })
        ) : (
          <span className="text-xs text-zinc-500">—</span>
        )}
      </TableCell>
      <TableCell className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {!isExternal ? prop.description : <em className="text-zinc-500">External — view on schema.org</em>}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-[11px]">
          {inheritanceSource}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
