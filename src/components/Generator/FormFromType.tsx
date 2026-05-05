import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyField } from '@/components/Generator/PropertyField';
import { groupProperties } from '@/components/Generator/property-groups';
import { useDataset } from '@/hooks/useDataset';
import type { FieldValue, FormState } from '@/lib/jsonld-build';
import { bareName } from '@/lib/utils';
import type { SchemaType, SchemaProperty } from '@/types/schema-org';

interface FormFromTypeProps {
  type: SchemaType;
  state: FormState;
  onChange: (next: FormState) => void;
}

export function FormFromType({ type, state, onChange }: FormFromTypeProps) {
  const dataset = useDataset();
  const groups = useMemo(() => groupProperties(type), [type]);

  function setField(propName: string, value: FieldValue) {
    onChange({ ...state, entries: { ...state.entries, [propName]: value } });
  }

  const hasAnnotated = groups.required.length > 0 || groups.recommended.length > 0;
  const advancedTitle = hasAnnotated
    ? `Advanced (${groups.advanced.length} more)`
    : `All properties (${groups.advanced.length})`;

  return (
    <div className="space-y-6">
      {groups.required.length > 0 && (
        <Section title="Required" defaultOpen>
          {groups.required.map((propId) => (
            <FormProperty
              key={propId}
              propId={propId}
              status="required"
              dataset={dataset}
              state={state}
              setField={setField}
            />
          ))}
        </Section>
      )}
      {groups.recommended.length > 0 && (
        <Section title="Recommended" defaultOpen>
          {groups.recommended.map((propId) => (
            <FormProperty
              key={propId}
              propId={propId}
              status="recommended"
              dataset={dataset}
              state={state}
              setField={setField}
            />
          ))}
        </Section>
      )}
      <Section title={advancedTitle} defaultOpen>
        {groups.advanced.map((propId) => (
          <FormProperty
            key={propId}
            propId={propId}
            dataset={dataset}
            state={state}
            setField={setField}
          />
        ))}
      </Section>
    </div>
  );
}

function FormProperty({
  propId,
  status,
  dataset,
  state,
  setField,
}: {
  propId: string;
  status?: 'required' | 'recommended';
  dataset: ReturnType<typeof useDataset>;
  state: FormState;
  setField: (name: string, val: FieldValue) => void;
}) {
  const term = dataset.termsById[propId];
  // External-only inherited properties (e.g. Thing.name) aren't in our 163-set.
  // Surface them as plain text fields so users can still author them.
  const propName = bareName(propId);
  if (!term || term.kind !== 'Property') {
    const property: SchemaProperty = {
      id: propId,
      iri: `https://schema.org/${propName}`,
      name: propName,
      description: '',
      kind: 'Property',
      layer: 'core',
      source: 'meta-ancestor',
      pending: false,
      domainIncludes: [],
      rangeIncludes: ['schema:Text'],
    };
    return (
      <PropertyField
        property={property}
        termsById={dataset.termsById}
        value={state.entries[propName]}
        onChange={(v) => setField(propName, v)}
        status={status}
      />
    );
  }
  return (
    <PropertyField
      property={term}
      termsById={dataset.termsById}
      value={state.entries[propName]}
      onChange={(v) => setField(propName, v)}
      status={status}
    />
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section>
      <Button
        variant="ghost"
        className="-ml-2 h-8 px-2 text-sm font-medium"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span className="mr-2 inline-block w-2">{open ? '▾' : '▸'}</span>
        {title}
      </Button>
      {open && <div className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-800">{children}</div>}
    </section>
  );
}
